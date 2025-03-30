import { Session, User } from "@ckm/db";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { LoggingService } from "src/logging/logging.service";
import { PrismaService } from "src/prisma/prisma.service";
import { Response } from 'express'
import { EnvService } from "src/env/env.service";

export type SessionValidationResult =
  | { session: Session; user: User }
  | { session: null; user: null };

export type SessionInput = {
  id: string,
  verificationCode: string,
  verified: boolean,
  token: string,
  expiresAt: Date,
  userId: number

}

export type VerifySessionResult = {
  sessionToken: string,
  user: User
}

interface RandomReader {
  read(bytes: Uint8Array): void;
}


@Injectable()
export class AuthSessionsService {
  private readonly THIRTY_DAYS: number = 30 * 24 * 60 * 60 * 1000;
  private readonly FIFTEEN_DAYS: number = 15 * 24 * 60 * 60 * 1000;
  private ONE_HOUR: number = 60 * 60 * 1000;

  constructor(
    private prisma: PrismaService,
    private readonly logger: LoggingService,
    private readonly envService: EnvService
  ) { }


  seSessionCookie(response: Response, token: string, expiresIn: number = this.THIRTY_DAYS) {
    response.cookie('session_token', token, {
      httpOnly: true,
      secure: this.envService.get('NODE_ENV') === "prod",
      sameSite: 'strict',
      maxAge: expiresIn,
      path: '/'
    })
  }

  clearSessionCookie(response: Response) {
    response.clearCookie('session_token', {
      httpOnly: true,
      secure: this.envService.get('NODE_ENV') === "prod",
      sameSite: 'strict',
      path: '/'
    })
  }

  async generatedVerifictionCode(): Promise<string> {
    const { generateRandomString } = await import("@oslojs/crypto/random");
    const random = {
      read(bytes) {
        crypto.getRandomValues(bytes);
      }
    } satisfies RandomReader;

    return generateRandomString(random, '0123456789', 6)
  }

  async generateSessionToken(): Promise<string> {
    const { encodeBase32LowerCaseNoPadding } = await import("@oslojs/encoding");
    const bytes = new Uint8Array(32);
    crypto.getRandomValues(bytes)
    const token = encodeBase32LowerCaseNoPadding(bytes)
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

      return {
        session,
        user: session.user
      };
    } catch (error) {
      this.logger.handleError(error, 'getFullSession Erorr')
    }
  }

  async createSession(token: string, userId: number, verified = false): Promise<Session> {
    try {
      const { sha256 } = await import("@oslojs/crypto/sha2");
      const { encodeHexLowerCase } = await import("@oslojs/encoding");
      const generatedVerifactionCode = await this.generatedVerifictionCode()
      const generatedSessionToken = await this.generateSessionToken()
      const id = encodeHexLowerCase(sha256(new TextEncoder().encode(token)))
      const session = this.prisma.session.create({
        data: {
          id,
          verificationCode: generatedVerifactionCode,
          token: generatedSessionToken,
          expiresAt: new Date(Date.now() + this.THIRTY_DAYS),
          userId,
          verified
        } satisfies SessionInput
      });

      return session
    } catch (error) {
      this.logger.handleError(error, `${(error as any).message}`);
    }
  }

  async extendedSession(sessionId: string): Promise<Session> {
    try {
      const session = await this.prisma.session.findUniqueOrThrow({
        where: { id: sessionId }
      })

      if (Date.now() >= session.expiresAt.getTime() - this.FIFTEEN_DAYS) {
        const newExpiresAt = new Date(Date.now() + this.THIRTY_DAYS)
        await this.prisma.session.update({
          where: { id: sessionId },
          data: {
            expiresAt: newExpiresAt
          }
        })
        session.expiresAt = newExpiresAt
      }

      return session
    } catch (error) {
      this.logger.handleError(error, 'Erorr extending the session')
    }
  }

  async validateSessionToken(token: string): Promise<SessionValidationResult> {
    const { sha256 } = await import("@oslojs/crypto/sha2");
    const { encodeHexLowerCase } = await import("@oslojs/encoding");
    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

    try {
      const session = await this.prisma.session.findUnique({
        where: { id: sessionId },
        include: {
          user: true
        }
      })

      if (!session) {
        return { session: null, user: null }
      }


      if (Date.now() >= session.expiresAt.getTime()) {
        await this.invalidateSession(session.user.id)
        return { session: null, user: null }
      }

      // Extend session if we're in the last half of its lifetime
      await this.extendedSession(session.id)

      return { session, user: session.user }
    } catch (error) {
      this.logger.handleError(error, 'Error at validateSessionToken')
    }
  }

  async invalidateSession(userId: number): Promise<void> {

    try {
      const user = await this.prisma.user.findUniqueOrThrow({
        where: { id: userId },
        include: {
          sessions: true
        }
      })

      await Promise.all(user.sessions.map(async ({ id }) => {
        this.prisma.session.delete({ where: { id } })
      }))

    } catch (error) {
      this.logger.handleError(error, 'Error at invalidateSession')
    }
  }

  async invalidateAllUserSessions(userId: number): Promise<void> {
    await this.prisma.session.deleteMany({ where: { userId } });
  }

  async verifySession(verificationCode: string): Promise<VerifySessionResult> {
    try {
      const session = await this.prisma.session.findUnique({
        where: { verificationCode },
        include: { user: true }
      });

      if (!session) {
        throw new UnauthorizedException('Invalid verification code');
      }

      await this.prisma.session.update({
        where: { id: session.id },
        data: { verified: true, verificationCode: '' }
      })

      const newToken = await this.generateSessionToken();
      await this.createSession(newToken, session.userId, true)
      await this.invalidateSession(session.userId)

      return { sessionToken: newToken, user: session.user }


    } catch (error) {
      this.logger.handleError(error, 'Failed to verifySession')
    }
  }

  async createPassowrdResetToken(userId: number): Promise<string> {
    try {
      const resetToken = await this.generateSessionToken()
      await this.prisma.passwordReset.create({
        data: {
          userId,
          token: resetToken,
          expiresAt: new Date(Date.now() + this.ONE_HOUR),
        }
      })

      return resetToken

    } catch (error) {
      this.logger.handleError(error, 'Error creating password reset token');
    }
  }


  async validatePasswordResetToken(token: string): Promise<{
    isValid: boolean;
    user?: User;
  }> {
    try {
      const reset = await this.prisma.passwordReset.findUnique({
        where: { token },
        include: { user: true },
      });

      if (!reset || reset.expiresAt < new Date()) {
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
    } catch (error) {
      this.logger.handleError(error, 'Error invalidating password reset tokens');
    }
  }

} //#endregion

