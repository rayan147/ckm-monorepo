// src/csrf/csrf.controller.ts
import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { createCsrfUtilities } from './csrf.config';
import { EnvService } from '../env/env.service';

@Controller('csrf')
export class CsrfController {
  private csrfUtilities: ReturnType<typeof createCsrfUtilities>;

  constructor(envService: EnvService) {
    this.csrfUtilities = createCsrfUtilities(envService);
  }

  @Get()
  getCsrfToken(@Req() req: Request, @Res() res: Response) {
    try {
      const csrfToken = this.csrfUtilities.generateToken(req, res);
      console.log('Generated CSRF Token:', csrfToken);
      console.log('Set-Cookie Header:', res.getHeaders()['set-cookie']);

      if (csrfToken) {
        res.json({
          csrfToken,
          status: 200,
        });
      }
    } catch (error) {
      res.status(400).json({ message: 'Failed to generate CSRF token' });
    }
  }
}
