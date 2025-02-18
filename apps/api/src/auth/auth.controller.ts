
import { Controller, Req, Res, UseGuards, Headers } from '@nestjs/common';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { contract } from '@ckm/contracts';
import { AuthService } from './auth.service';
import { I18nService } from '../i18n/i18n.service';
import { EnvService } from 'src/env/env.service';
import { createCsrfUtilities } from 'src/csrf/csrf.config';
import { Request, Response } from 'express';
import { CsrfGuard } from 'src/csrf/csrf.guard';

@Controller()
export class AuthController {
  private csrfUtilities: ReturnType<typeof createCsrfUtilities>;
  constructor(
    private authService: AuthService,
    private i18nService: I18nService,
    private envService: EnvService,
  ) {
    this.csrfUtilities = createCsrfUtilities(envService)
  }

  // Add this helper method to handle CSRF token generation
  private setCsrfToken(req: Request, res: Response) {
    return this.csrfUtilities.generateToken(req, res, true);
  }

  @TsRestHandler(contract.auth.resendCode)
  async resendCode() {
    return tsRestHandler(contract.auth.resendCode, async ({ body }) => {
      try {
        const result = await this.authService.resendCode(body.email);
        return {
          status: 200 as const,
          body: result,
        };
      } catch (error) {
        return {
          status: 401 as const,
          body: { message: (error as Error).message },
        };
      }
    });
  }

  @UseGuards(CsrfGuard)
  @TsRestHandler(contract.auth.login)
  async login(@Headers('x-csrf-token') csrfToken: string) {

    return tsRestHandler(contract.auth.login, async ({ body }) => {
      try {
        const result = await this.authService.login(body.email, body.password);
        // Generate and set CSRF token after successful login
        return {
          status: 200 as const,
          body: {
            ...result,
          },
        };
      } catch (error) {
        return {
          status: 401 as const,
          body: { message: (error as Error).message },
        };
      }
    });
  }

  @TsRestHandler(contract.auth.verifyLoginCode)
  async verifyLoginCode() {
    return tsRestHandler(contract.auth.verifyLoginCode, async ({ body }) => {
      try {
        const result = await this.authService.verifyLoginCode(body.code);
        return {
          status: 200 as const,
          body: result,
        };
      } catch (error) {
        return {
          status: 401 as const,
          body: { message: (error as Error).message },
        };
      }
    });
  }

  @TsRestHandler(contract.auth.register)
  async register() {
    return tsRestHandler(contract.auth.register, async ({ body }) => {
      try {
        const user = await this.authService.register(body);
        const { passwordHash, ...restUser } = user;
        return {
          status: 201 as const,
          body: restUser,
        };
      } catch (error) {
        return {
          status: 400 as const,
          body: { message: (error as Error).message },
        };
      }
    });
  }

  @TsRestHandler(contract.auth.changePassword)
  async changePassword(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return tsRestHandler(contract.auth.changePassword, async ({ body, params }) => {
      try {
        await this.authService.changePassword(
          params.userId,
          body.oldPassword,
          body.newPassword,
        );
        // Rotate CSRF token after password change
        this.setCsrfToken(req, res);
        return {
          status: 200 as const,
          body: {
            message: this.i18nService.translate('AUTH.CHANGE_PASSWORD.SUCCESS'),
          },
        };
      } catch (error) {
        return {
          status: 400 as const,
          body: { message: (error as Error).message },
        };
      }
    });
  }

  @TsRestHandler(contract.auth.logout)
  async logout() {
    return tsRestHandler(contract.auth.logout, async ({ body }) => {
      try {
        await this.authService.logout(body.userId, body.accessToken);
        return {
          status: 200 as const,
          body: {
            message: this.i18nService.translate('AUTH.LOGOUT.SUCCESS'),
          },
        };
      } catch (error) {
        return {
          status: 400 as const,
          body: { message: (error as Error).message },
        };
      }
    });
  }

  @TsRestHandler(contract.auth.forgotPassword)
  async forgotPassword() {
    return tsRestHandler(contract.auth.forgotPassword, async ({ body }) => {
      try {
        const result = await this.authService.forgotPassword(body.email);
        return {
          status: 200 as const,
          body: result,
        };
      } catch (error) {
        return {
          status: 400 as const,
          body: { message: (error as Error).message },
        };
      }
    });
  }

  @TsRestHandler(contract.auth.resetPassword)
  async resetPassword(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return tsRestHandler(contract.auth.resetPassword, async ({ body }) => {
      try {
        const result = await this.authService.resetPassword(
          body.resetToken,
          body.newPassword,
        );

        // Rotate CSRF token after password change
        this.setCsrfToken(req, res);
        return {
          status: 200 as const,
          body: result,
        };
      } catch (error) {
        return {
          status: 400 as const,
          body: { message: (error as Error).message },
        };
      }
    });
  }
}

