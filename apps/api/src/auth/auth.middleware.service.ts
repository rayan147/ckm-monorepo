import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthSessionsService } from './utils/auth.sessions.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private readonly publicPaths = [
    '/csft',
    'auth/login',
    'auth/register',
    'auth/verify-login',
    'auth/forgot-password'
  ]
  constructor(private authSession: AuthSessionsService) { }

  async use(req: Request, res: Response, next: NextFunction) {
    const isPublicPath = this.publicPaths.some(path => req.path.startsWith(path))
    console.log({ req })
    if (isPublicPath) {
      return next()
    }

    const token = req.cookies['session_token'];
    if (token) {
      const { session, user } = await this.authSession.validateSessionToken(token);

      if (session && user) {
        req.user = user;
        req.session = session;
      }
    }

    next();
  }
}
