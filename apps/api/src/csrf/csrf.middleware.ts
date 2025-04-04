// src/csrf/csrf.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { CsrfService } from './csrf.service';

@Injectable()
export class CsrfMiddleware implements NestMiddleware {
  constructor(private readonly csfService: CsrfService) { }

  use(req: Request, res: Response, next: NextFunction) {
    if (!req.session?.csrfToken) {
      const token = this.csfService.generateCsrfToken(req);

      if (req.session) {
        req.session.csrfToken = token;
      }

      res.setHeader('X-CSRF-Token', token)
    } else {
      res.setHeader('X-CSRF-Token', req.session.csrfToken)
    }

    next()
  }
}
