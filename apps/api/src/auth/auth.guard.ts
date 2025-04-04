// auth.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthSessionsService } from './utils/auth.sessions.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authSession: AuthSessionsService
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Check if route is marked as public
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    // Get request from context
    const request = context.switchToHttp().getRequest();
    console.log({ request })

    const token = request.cookies['session_token']
    if (!token) {
      return false;
    }

    // Validate token
    const { session, user } = await this.authSession.validateSessionToken(token);
    if (!session || !user) {
      return false;
    }

    // Attach user and session to request
    request.user = user;
    request.session = session;

    return true;
  }
}
