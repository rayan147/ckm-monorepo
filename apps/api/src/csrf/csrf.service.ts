// src/csrf/csrf.service.ts
import { Injectable } from '@nestjs/common';
import { csrfSync } from 'csrf-sync';
import { Request, Response } from 'express';
import { EnvService } from 'src/env/env.service';

@Injectable()
export class CsrfService {
  private readonly csrfProtection;
  private readonly generateToken;
  private readonly revokeToken;

  constructor(private readonly envService: EnvService) {
    const {
      csrfSynchronisedProtection,
      generateToken,
      revokeToken,
    } = csrfSync({
      ignoredMethods: ['GET', 'HEAD', 'OPTIONS'],
      getTokenFromState: (req) => {
        return req.session?.csrfToken;
      },
      getTokenFromRequest: (req) => {
        // Check headers first, then body for form submissions
        return req.headers['x-csrf-token'] || req.body?.csrfToken;
      },
      storeTokenInState: (req, token) => {
        if (req.session) {
          req.session.csrfToken = token;
        }
      },
      size: 128,
    });

    this.csrfProtection = csrfSynchronisedProtection;
    this.generateToken = generateToken;
    this.revokeToken = revokeToken;
  }

  /**
   * Middleware for CSRF protection
   */
  protect() {
    return this.csrfProtection;
  }

  /**
   * Generate a CSRF token for a request
   * @param req Express request
   * @param forceNew Force generation of a new token
   * @returns CSRF token
   */
  generateCsrfToken(req: Request, forceNew: boolean = false): string {
    return this.generateToken(req, forceNew);
  }

  /**
   * Revoke a CSRF token
   * @param req Express request
   */
  revokeCsrfToken(req: Request): void {
    this.revokeToken(req);
  }

  /**
   * Set CSRF token in response
   * @param req Express request
   * @param res Express response
   */
  setCsrfToken(req: Request, res: Response): string {
    const token = this.generateCsrfToken(req);
    // Don't expose the token in a cookie, but you can add it to response headers
    // if needed for your frontend to access
    res.setHeader('X-CSRF-Token', token);
    return token;
  }
}
