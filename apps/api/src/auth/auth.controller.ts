import { Controller } from '@nestjs/common';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { contract } from '@ckm/contracts';
import { AuthService } from './auth.service';
import { I18nService } from '../i18n/i18n.service';

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private i18nService: I18nService,
  ) { }

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

  @TsRestHandler(contract.auth.login)
  async login() {
    return tsRestHandler(contract.auth.login, async ({ body }) => {
      try {
        const result = await this.authService.login(body.email, body.password);
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
  async changePassword() {
    return tsRestHandler(contract.auth.changePassword, async ({ body, params }) => {
      try {
        await this.authService.changePassword(
          params.userId,
          body.oldPassword,
          body.newPassword,
        );
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
  async resetPassword() {
    return tsRestHandler(contract.auth.resetPassword, async ({ body }) => {
      try {
        const result = await this.authService.resetPassword(
          body.resetToken,
          body.newPassword,
        );
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

