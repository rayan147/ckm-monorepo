/// <reference types="express" />
import { User, Session } from '@ckm/db';
declare global {
  namespace Express {
    interface Request {
      user?: User;
      session?: Session;
    }
  }
}
