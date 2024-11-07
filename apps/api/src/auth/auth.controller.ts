import { Controller } from '@nestjs/common';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { contract } from '@ckm/contracts';
import { AuthService } from './auth.service';
import { I18nService } from '../i18n/i18n.service';
import { pipe } from 'fp-ts/function';
import * as TE from 'fp-ts/TaskEither';

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private i18nService: I18nService,
  ) { }

  @TsRestHandler(contract.auth.resendCode)
  async resendCode() {
    return tsRestHandler(contract.auth.resendCode, async ({ body }) => {
      return pipe(
        this.authService.resendCode(body.email),
        TE.matchW(
          (error) => ({
            status: 401 as const,
            body: { message: error.message },
          }),
          (result) => ({
            status: 200 as const,
            body: result,
          }),
        ),
      )();
    });
  }

  @TsRestHandler(contract.auth.login)
  async login() {
    return tsRestHandler(contract.auth.login, async ({ body }) => {
      return pipe(
        this.authService.login(body.email, body.password),
        TE.matchW(
          (error) => ({
            status: 401 as const,
            body: { message: error.message },
          }),
          (result) => ({
            status: 200 as const,
            body: result,
          }),
        ),
      )();
    });
  }

  @TsRestHandler(contract.auth.verifyLoginCode)
  async verifyLoginCode() {
    return tsRestHandler(contract.auth.verifyLoginCode, async ({ body }) => {
      return pipe(
        this.authService.verifyLoginCode(body.code),
        TE.matchW(
          (error) => ({
            status: 401 as const,
            body: { message: error.message },
          }),
          (result) => ({
            status: 200 as const,
            body: result,
          }),
        ),
      )();
    });
  }

  @TsRestHandler(contract.auth.register)
  async register() {
    return tsRestHandler(contract.auth.register, async ({ body }) => {
      return pipe(
        this.authService.register(body),
        TE.matchW(
          (error) => ({
            status: 400 as const,
            body: { message: error.message },
          }),
          (user) => {
            const { passwordHash, ...result } = user;
            return { status: 201 as const, body: result };
          },
        ),
      )();
    });
  }

  @TsRestHandler(contract.auth.changePassword)
  async changePassword() {
    return tsRestHandler(
      contract.auth.changePassword,
      async ({ body, params }) => {
        return pipe(
          this.authService.changePassword(
            params.userId,
            body.oldPassword,
            body.newPassword,
          ),
          TE.matchW(
            (error) => ({
              status: 400 as const,
              body: { message: error.message },
            }),
            () => ({
              status: 200 as const,
              body: {
                message: this.i18nService.translate(
                  'AUTH.CHANGE_PASSWORD.SUCCESS',
                ),
              },
            }),
          ),
        )();
      },
    );
  }

  @TsRestHandler(contract.auth.logout)
  async logout() {
    return tsRestHandler(contract.auth.logout, async ({ body }) => {
      return pipe(
        this.authService.logout(body.userId, body.accessToken),
        TE.matchW(
          (error) => ({
            status: 400 as const,
            body: {
              message: error.message,
            },
          }),
          () => ({
            status: 200 as const,
            body: {
              message: this.i18nService.translate('AUTH.LOGOUT.SUCCESS'),
            },
          }),
        ),
      )();
    });
  }

  @TsRestHandler(contract.auth.forgotPassword)
  async forgotPassword() {
    return tsRestHandler(contract.auth.forgotPassword, async ({ body }) => {
      return pipe(
        this.authService.forgotPassword(body.email),
        TE.matchW(
          (error) => ({
            status: 400 as const,
            body: { message: error.message },
          }),
          (result) => ({
            status: 200 as const,
            body: result,
          }),
        ),
      )();
    });
  }

  @TsRestHandler(contract.auth.resetPassword)
  async resetPassword() {
    return tsRestHandler(contract.auth.resetPassword, async ({ body }) => {
      return pipe(
        this.authService.resetPassword(body.resetToken, body.newPassword),
        TE.matchW(
          (error) => ({
            status: 400 as const,
            body: { message: error.message },
          }),
          (result) => ({
            status: 200 as const,
            body: result,
          }),
        ),
      )();
    });
  }
}
