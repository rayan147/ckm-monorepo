/// <reference types="express" />
import { User, Session } from '@ckm/db';
import type { CsrfSyncedToken } from 'csrf-sync';
declare global {
  namespace Express {
    interface Request {
      user?: User;
      session?: Session & { csrfToken?: CsrfSyncedToken };
    }
  }
}
