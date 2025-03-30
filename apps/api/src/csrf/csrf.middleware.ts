// src/csrf/csrf.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { EnvService } from '../env/env.service';

@Injectable()
export class CsrfMiddleware implements NestMiddleware {
  private readonly excludedRoutes = [
    '/csrf',
    '/auth/login',
    '/auth/register'
  ];
  private readonly excludedMethods = ['GET', 'HEAD', 'OPTIONS'];
  private readonly cookieName: string;

  constructor(private readonly envService: EnvService) {
    const isDev = envService.get('NODE_ENV') !== 'prod';
    this.cookieName = isDev ? 'psifi.x-csrf-token' : '__Host-psifi.x-csrf-token';
  }

  use(req: Request, res: Response, next: NextFunction) {
    // Skip CSRF validation for excluded methods
    if (this.excludedMethods.includes(req.method)) {
      return next();
    }

    // Skip for excluded routes
    if (this.excludedRoutes.some(route => req.path.startsWith(route))) {
      return next();
    }

    // Get token from cookie and header
    const cookieToken = req.cookies[this.cookieName];
    const headerToken = req.headers['x-csrf-token'] as string;

    // Validate tokens exist and match
    if (!cookieToken || !headerToken || cookieToken !== headerToken) {
      return res.status(403).json({ message: 'Invalid CSRF token' });
    }

    next();
  }
}
