// src/csrf/csrf.controller.ts
import { Controller, Get, Res, Req } from '@nestjs/common';
import { Request, Response } from 'express';
import { Public } from 'src/decorators/public.decorator';
import { CsrfService } from './csrf.service';


@Controller('csrf')
export class CsrfController {
  constructor(private readonly csrfService: CsrfService) {
  }

  @Get('csrf-token')
  @Public()
  getCsrfToken(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    // Generate new CSRF token
    const token = this.csrfService.generateCsrfToken(req);

    // Set it in the session
    if (req.session?.csrfToken) {
      req.session.csrfToken = token;

    }

    // Return it in the response
    return { csrfToken: token };
  }
}
