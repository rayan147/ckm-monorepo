// auth.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthSessionsService } from './utils/auth.sessions.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authSession: AuthSessionsService,
    private reflector: Reflector,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = request.cookies['session_token'];

    if (!token) {
      return false;
    }

    const { session, user } = await this.authSession.validateSessionToken(token);
    if (session && user) {
      request.user = user;
      request.session = session;
      return true;
    }

    return false;
  }
}
