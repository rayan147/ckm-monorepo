// src/csrf/csrf.guard.ts
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class CsrfGuard implements CanActivate {
  constructor(private relector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    // const isPublic = this.relector.getAllAndOverride<boolean>('isPublic', [
    //   context.getHandler(),
    //   context.getClass()
    // ])
    //
    // if (isPublic) {
    //   return true
    // }
    //
    const req = context.switchToHttp().getRequest();

    if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
      return true;
    }

    try {
      const hasValidToken = this.validateCsrfToken(req);
      if (!hasValidToken) {
        throw new UnauthorizedException('Invalid CSRF token');
      }
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid CSRF token');
    }
  }

  private validateCsrfToken(req: Request): boolean {
    const token = req.headers['x-csrf-token'] || req.body?.csrfToken;
    const storedToken = req.session?.csrfToken;

    return !!token && !!storedToken && token === storedToken;
  }
}
