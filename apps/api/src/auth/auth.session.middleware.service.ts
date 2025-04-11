import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CsrfSyncedToken } from 'csrf-sync';
import { Session } from '@ckm/db';

@Injectable()
export class SessionInitMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    if (!req.session) {
      req.session = {} as Session & { csrfToken: CsrfSyncedToken };
    }
    next();
  }
}
