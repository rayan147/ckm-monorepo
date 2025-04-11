import { Auth, Session, User } from '@ckm/db';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoggingService } from 'src/logging/logging.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Response, Request } from 'express';
import { EnvService } from 'src/env/env.service';
import { CsrfService } from 'src/csrf/csrf.service';

export type SessionValidationResult =
  | { session: Session; user: User }
  | { session: null; user: null };

export type SessionInput = {
  id: string;
  verificationCode: string;
  verified: boolean;
  expiresAt: Date;
  userId: number;
};

export type VerifySessionResult = {
  sessionToken: string;
  user: User & { auth: Partial<Auth[]> };
};

interface RandomReader {
  read(bytes: Uint8Array): void;
}

@Injectable()
export class AuthSessionsService {
  private readonly THIRTY_DAYS: number = 30 * 24 * 60 * 60 * 1000;
  private readonly FIFTEEN_DAYS: number = 15 * 24 * 60 * 60 * 1000;
  private readonly ONE_HOUR: number = 60 * 60 * 1000;

  constructor(
    private prisma: PrismaService,
    private readonly logger: LoggingService,
    private readonly envService: EnvService,
    private readonly csrfService: CsrfService,
  ) {}

  setSessionCookie(
    response: Response,
    token: string,
    request: Request,
    expiresIn: number = this.THIRTY_DAYS,
  ) {
    const isDev = this.envService.get('NODE_ENV') === 'dev';

    console.log('Setting cookie with token:', token, 'Dev mode:', isDev);

    response.cookie('session_token', token, {
      httpOnly: true,
      secure: !isDev,
      sameSite: 'strict',
      maxAge: expiresIn,
      path: '/',
    });

    console.log('Cookie headers after setting:', response.getHeaders());
    return this.csrfService.setCsrfToken(request, response);
  }

  clearSessionCookie(response: Response) {
    const isDev = this.envService.get('NODE_ENV') === 'dev';

    response.clearCookie('session_token', {
      httpOnly: true,
      secure: !isDev,
      sameSite: 'strict',
      path: '/',
    });
  }

  async generatedVerifictionCode(): Promise<string> {
    const { generateRandomString } = await import('@oslojs/crypto/random');
    const random = {
      read(bytes) {
        crypto.getRandomValues(bytes);
      },
    } satisfies RandomReader;

    return generateRandomString(random, '0123456789', 6);
  }

  async generateSessionToken(): Promise<string> {
    const { encodeBase32LowerCaseNoPadding } = await import('@oslojs/encoding');
    const bytes = new Uint8Array(32);
    crypto.getRandomValues(bytes);
    const token = encodeBase32LowerCaseNoPadding(bytes);
    return token;
  }

  async getFullSession(sessionId: string): Promise<SessionValidationResult> {
    try {
      const session = await this.prisma.session.findUnique({
        where: { id: sessionId },
        include: {
          user: true,
        },
      });

      if (session === null) {
        return { session: null, user: null };
      }

      if (Date.now() >= session.expiresAt.getTime()) {
        await this.invalidateSession(session.user.id);
        return { session: null, user: null };
      }

      return {
        session,
        user: session.user,
      };
    } catch (error) {
      this.logger.handleError(error, 'Error in getFullSession');
    }
  }

  async createSession(
    token: string,
    userId: number,
    verified = false,
    expiresAt?: Date,
  ): Promise<Session> {
    try {
      const { sha256 } = await import('@oslojs/crypto/sha2');
      const { encodeHexLowerCase } = await import('@oslojs/encoding');

      const generatedVerifactionCode = await this.generatedVerifictionCode();
      const id = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

      const session = await this.prisma.session.create({
        data: {
          id,
          verificationCode: generatedVerifactionCode,
          expiresAt: expiresAt ?? new Date(Date.now() + this.THIRTY_DAYS),
          userId,
          verified,
        } satisfies SessionInput,
      });

      return session;
    } catch (error) {
      this.logger.handleError(error, `Error creating session: ${(error as any).message}`);
    }
  }

  async extendedSession(sessionId: string): Promise<Session> {
    try {
      const session = await this.prisma.session.findUniqueOrThrow({
        where: { id: sessionId },
      });

      if (Date.now() >= session.expiresAt.getTime()) {
        throw new UnauthorizedException('Cannot extend expired session');
      }

      if (Date.now() >= session.expiresAt.getTime() - this.FIFTEEN_DAYS) {
        const newExpiresAt = new Date(Date.now() + this.THIRTY_DAYS);

        const updatedSession = await this.prisma.session.update({
          where: { id: sessionId },
          data: {
            expiresAt: newExpiresAt,
          },
        });

        return updatedSession;
      }

      return session;
    } catch (error) {
      this.logger.handleError(error, 'Error extending the session');
    }
  }

  async validateSessionToken(token: string): Promise<SessionValidationResult> {
    try {
      const { sha256 } = await import('@oslojs/crypto/sha2');
      const { encodeHexLowerCase } = await import('@oslojs/encoding');
      const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

      const session = await this.prisma.session.findUnique({
        where: { id: sessionId },
        include: {
          user: true,
        },
      });

      const sessionIsValid = !!session && Date.now() < session.expiresAt.getTime();

      if (!sessionIsValid) {
        if (session && Date.now() >= session.expiresAt.getTime()) {
          await this.invalidateSession(session.user.id);
        }
        return { session: null, user: null };
      }

      await this.extendedSession(session.id);

      return { session, user: session.user };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async invalidateSession(userId: number): Promise<void> {
    try {
      console.log('AuthSessionsService: Invalidating session for userId:', userId);
      const user = await this.prisma.user.findUniqueOrThrow({
        where: { id: userId },
        include: {
          sessions: true,
        },
      });

      console.log('AuthSessionsService: Found user with sessions count:', user.sessions.length);

      if (user.sessions.length === 0) {
        console.log('AuthSessionsService: No sessions found for user');
        return;
      }

      for (const session of user.sessions) {
        console.log('AuthSessionsService: Deleting session with id:', session.id);
        await this.prisma.session.delete({ where: { id: session.id } });
      }

      console.log('AuthSessionsService: Successfully invalidated all sessions for user', userId);
      this.logger.log(`Successfully invalidated all sessions for user ${userId}`);
    } catch (error) {
      console.error('AuthSessionsService: Error invalidating sessions:', error);
      this.logger.error('Error invalidating sessions', error as Error);
      throw error;
    }
  }

  async invalidateAllUserSessions(userId: number): Promise<void> {
    await this.prisma.session.deleteMany({ where: { userId } });
  }

  async verifySession(verificationCode: string): Promise<VerifySessionResult> {
    try {
      const session = await this.prisma.session.findUnique({
        where: { verificationCode },
        include: {
          user: {
            include: {
              auth: true,
            },
          },
        },
      });

      if (!session) {
        throw new UnauthorizedException('Invalid verification code');
      }

      if (Date.now() >= session.expiresAt.getTime()) {
        throw new UnauthorizedException('Verification code has expired');
      }

      await this.prisma.session.update({
        where: { id: session.id },
        data: {
          verified: true,
          verificationCode: await this.generatedVerifictionCode(), // Generate a new code
        },
      });

      const newToken = await this.generateSessionToken();

      const { sha256 } = await import('@oslojs/crypto/sha2');
      const { encodeHexLowerCase } = await import('@oslojs/encoding');
      const newSessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(newToken)));

      await this.prisma.session.update({
        where: { id: session.id },
        data: { id: newSessionId },
      });

      return { sessionToken: newToken, user: session.user };
    } catch (error) {
      this.logger.handleError(error, 'Failed to verify session');
    }
  }

  async createPasswordResetToken(userId: number): Promise<string> {
    try {
      await this.invalidatePasswordResetTokens(userId);

      const resetToken = await this.generateSessionToken();

      await this.prisma.passwordReset.create({
        data: {
          userId,
          token: resetToken,
          expiresAt: new Date(Date.now() + this.ONE_HOUR),
        },
      });

      return resetToken;
    } catch (error) {
      this.logger.handleError(error, 'Error creating password reset token');
    }
  }

  async validatePasswordResetToken(token: string): Promise<{
    isValid: boolean;
    user?: User;
  }> {
    try {
      await new Promise(resolve => setTimeout(resolve, 150));

      const reset = await this.prisma.passwordReset.findUnique({
        where: { token },
        include: { user: true },
      });

      const isValid = !!reset && reset.expiresAt > new Date();

      if (!isValid) {
        if (reset && reset.expiresAt < new Date()) {
          await this.invalidatePasswordResetTokens(reset.userId);
        }
        return { isValid: false };
      }

      return { isValid: true, user: reset.user };
    } catch (error) {
      this.logger.handleError(error, 'Error validating password reset token');
    }
  }

  async invalidatePasswordResetTokens(userId: number): Promise<void> {
    try {
      await this.prisma.passwordReset.deleteMany({
        where: { userId },
      });

      this.logger.log(`Invalidated all password reset tokens for user ${userId}`);
    } catch (error) {
      this.logger.handleError(error, 'Error invalidating password reset tokens');
    }
  }
} //#endregion
