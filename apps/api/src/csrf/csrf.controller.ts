// src/csrf/csrf.controller.ts
import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { createCsrfUtilities } from './csrf.config';
import { EnvService } from '../env/env.service';

@Controller('csrf')
export class CsrfController {
  private csrfUtilities: ReturnType<typeof createCsrfUtilities>;

  constructor(private envService: EnvService) {
    this.csrfUtilities = createCsrfUtilities(envService);
  }

  @Get()
  getCsrfToken(@Req() req: Request, @Res() res: Response) {
    const token = this.csrfUtilities.generateToken(req, res);
    res.json({ csrfToken: token });
  }
}
