import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthSessionsService } from './utils/auth.sessions.service';
import { CsrfSyncedToken } from 'csrf-sync';
import { Session } from '@ckm/db';

@Injectable()
export class SessionInitMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    // If session doesn't exist yet (public route without auth), initialize it
    if (!req.session) {
      req.session = {} as Session & { csrfToken: CsrfSyncedToken }
    }
    next();
  }
}
