// src/csrf/csrf.controller.ts
import { Controller, Get, Res, Req } from '@nestjs/common';
import { Request, Response } from 'express';
import { EnvService } from '../env/env.service';
import { createCsrfUtilities } from './csrf.config';
import * as crypto from 'crypto';

@Controller('csrf')
export class CsrfController {
  private csrfUtils;
  private cookieName: string;

  constructor(private readonly envService: EnvService) {
    // Determine cookie name based on environment
    const isDev = envService.get('NODE_ENV') !== 'prod';
    this.cookieName = isDev ? 'psifi.x-csrf-token' : '__Host-psifi.x-csrf-token';
    this.csrfUtils = createCsrfUtilities(envService);
  }

  @Get()
  getCsrfToken(@Req() req: Request, @Res() res: Response) {
    try {
      // Generate a random token
      const token = crypto.randomBytes(32).toString('hex');

      // Set the cookie manually instead of using the library's generateToken
      res.cookie(this.cookieName, token, {
        httpOnly: false,
        sameSite: 'lax',
        path: '/',
        secure: this.envService.get('NODE_ENV') === 'prod',
      });

      // Return the token to be used in the x-csrf-token header
      return res.status(200).json({ csrfToken: token, status: 200 });
    } catch (error) {
      console.error('Error generating CSRF token:', error);
      return res.status(500).json({ message: 'Failed to generate CSRF token', status: 500 });
    }
  }
}
