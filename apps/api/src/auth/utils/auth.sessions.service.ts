import { Session, User } from "@ckm/db";
import { Injectable } from "@nestjs/common";
import { LoggingService } from "src/logging/logging.service";
import { PrismaService } from "src/prisma/prisma.service";


export type SessionValidationResult =
  | { session: Session; user: User }
  | { session: null; user: null };

export type SessionInput = {
  id: string,
  code: string,
  token: string,
  expiresAt: Date // 7 days
  userId: number

}

interface RandomReader {
  read(bytes: Uint8Array): void;
}


@Injectable()
export class AuthSessionsService {
  private SEVEN_DAYS: number = 7 * 24 * 60 * 60 * 1000;
  constructor(
    private prisma: PrismaService,
    private logger: LoggingService
  ) { }

  async generateVerifactionCode(): Promise<string> {
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

  async createSession(token: string, userId: number): Promise<Session> {
    try {
      const { sha256 } = await import("@oslojs/crypto/sha2");
      const { encodeHexLowerCase } = await import("@oslojs/encoding");
      const generatedVerifactionCode = await this.generateVerifactionCode()
      const generatedSessionToken = await this.generateSessionToken()
      const id = encodeHexLowerCase(sha256(new TextEncoder().encode(token)))
      const session = this.prisma.session.create({
        data: {
          id,
          code: generatedVerifactionCode,
          token: generatedSessionToken,
          expiresAt: new Date(Date.now() + this.SEVEN_DAYS), // 7 days
          userId
        }
      });

      return session

    } catch (error) {
      this.logger.handleError(error, `${(error as any).message}`);
    }
  }

  async validateSessionToken(token: string): Promise<SessionValidationResult> {
    const { sha256 } = await import("@oslojs/crypto/sha2");
    const { encodeHexLowerCase } = await import("@oslojs/encoding");
    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

    const session = await this.prisma.session.findUnique({
      where: { id: sessionId }
    })

    if (session === null) {
      return { session: null, user: null }
    }

    const user = await this.prisma.user.findUnique({
      where: { id: session.userId }
    })

    if (user === null) {
      return { session: null, user: null }
    }


    if (Date.now() >= session.expiresAt.getTime()) {
      await this.prisma.session.delete({
        where: { id: sessionId }
      })
    }

    if (Date.now() >= session.expiresAt.getTime() - this.SEVEN_DAYS) {
      const expiresAt = new Date(Date.now() + this.SEVEN_DAYS)
      await this.prisma.session.update({
        where: { id: sessionId },
        data: {
          expiresAt: expiresAt
        }
      })


    }
    return { session, user }
  }

  async invalidateSession(sessionId: string): Promise<void> {
    await this.prisma.session.delete({ where: { id: sessionId } });
  }

} //#endregion

