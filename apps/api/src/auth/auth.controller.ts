import { Controller, Req, Res, UseGuards, Headers } from '@nestjs/common';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { contract } from '@ckm/contracts';
import { AuthService } from './auth.service';
import { I18nService } from '../i18n/i18n.service';
import { EnvService } from 'src/env/env.service';
import { Request, Response } from 'express';
import { AuthSessionsService } from './utils/auth.sessions.service';
import { Public } from 'src/decorators/public.decorator';

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private i18nService: I18nService,
    private authSession: AuthSessionsService,
  ) {}

  @Public()
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
  @Public()
  // @UseGuards(CsrfGuard)
  @TsRestHandler(contract.auth.login)
  async login() {
    return tsRestHandler(contract.auth.login, async ({ body }) => {
      try {
        const result = await this.authService.login(body.email, body.password);
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

  @Public()
  // Enable the CSRF guard when you're ready
  // @UseGuards(CsrfGuard)
  @TsRestHandler(contract.auth.verifyLoginCode)
  async verifyLoginCode(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return tsRestHandler(contract.auth.verifyLoginCode, async ({ body }) => {
      try {
        const result = await this.authService.verifyLoginCode(body.verificationCode);

        // Pass the request object to the setSessionCookie method
        this.authSession.setSessionCookie(res, result.sessionToken, req);

        // Include the CSRF token in the response body
        return {
          status: 200 as const,
          body: {
            ...result,
            csrfToken: req?.session?.csrfToken, // Include the CSRF token in the response
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

  @Public()
  // @UseGuards(CsrfGuard)
  @TsRestHandler(contract.auth.register)
  async register() {
    return tsRestHandler(contract.auth.register, async ({ body }) => {
      try {
        const user = await this.authService.register(body);
        return {
          status: 201 as const,
          body: user,
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
        await this.authService.changePassword(params.userId, body.oldPassword, body.newPassword);
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
  async logout(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
    return tsRestHandler(contract.auth.logout, async ({ body }) => {
      try {
        console.log('API: Logout called with userId:', body.userId);
        await this.authService.logout(body.userId);
        const token = request.cookies['session_token'];
        console.log('API: Session token from cookie exists:', !!token);

        if (token) {
          console.log('API: Validating session token');
          const sessionResult = await this.authSession.validateSessionToken(token);
          console.log('API: Session validation result - session exists:', !!sessionResult.session);
          console.log('API: Session validation result - user exists:', !!sessionResult.user);

          if (sessionResult.user) {
            console.log('API: Invalidating session for user:', sessionResult.user.id);
            await this.authSession.invalidateSession(sessionResult.user.id);
          }
        }

        this.authSession.clearSessionCookie(response);
        console.log('API: Session cookie cleared');

        return {
          status: 200 as const,
          body: {
            message: this.i18nService.translate('AUTH.LOGOUT.SUCCESS'),
          },
        };
      } catch (error) {
        console.error('API: Logout error:', error);
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
        const result = await this.authService.resetPassword(body.resetToken, body.newPassword);

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

  @TsRestHandler(contract.auth.validateSessionToken)
  async validateSessionToken() {
    return tsRestHandler(contract.auth.validateSessionToken, async ({ body }) => {
      try {
        const result = await this.authSession.validateSessionToken(body.sessionToken);
        return {
          status: 200 as const,
          body: result,
        };
      } catch (error) {
        return {
          status: 400 as const,
          body: { success: false },
        };
      }
    });
  }
}
