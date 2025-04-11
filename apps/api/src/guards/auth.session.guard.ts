import { User } from '@ckm/db';
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthSessionsService } from 'src/auth/utils/auth.sessions.service';
import { Request } from 'express';
import { LoggingService } from 'src/logging/logging.service';

@Injectable()
export class SessionAuthGuard implements CanActivate {
  constructor(
    private sessionService: AuthSessionsService,
    private readonly logger: LoggingService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request & { user?: User }>();
    const sessionToken = request.cookies['session_token'];

    if (!sessionToken) {
      this.logger.debug('Auth failed: No session token provided');
      throw new UnauthorizedException('No session token provided');
    }

    try {
      const { session, user } = await this.sessionService.validateSessionToken(sessionToken);

      if (!session || !user) {
        this.logger.debug('Auth failed: Invalid session or user');
        throw new UnauthorizedException('Authentication required');
      }

      if (!session.verified) {
        this.logger.debug(`Auth failed: Unverified session for user ${user.id}`);
        throw new UnauthorizedException('Authentication required');
      }

      request.user = user;
      return true;
    } catch (error) {
      this.logger.handleError(error, 'Session authentication failed');
    }
  }
}
