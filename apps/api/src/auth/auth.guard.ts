// auth.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthSessionsService } from './utils/auth.sessions.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authSession: AuthSessionsService,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    console.log('Request URL:', request.url);
    console.log('Request Method:', request.method);
    console.log('Request Headers:', request.headers);
    console.log('Request Cookies:', request.cookies);
    const token = request.cookies['session_token'];
    if (!token) {
      return false;
    }

    const { session, user } = await this.authSession.validateSessionToken(token);
    if (!session || !user) {
      return false;
    }

    request.user = user;
    request.session = session;

    return true;
  }
}
