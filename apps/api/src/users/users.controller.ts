import { BadRequestException, Controller, Response } from '@nestjs/common';
import { TsRest, TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { UserService } from './users.service';
import { contract } from '@ckm/contracts';
import { pipe } from 'fp-ts/lib/function';
import * as TE from 'fp-ts/TaskEither';
import * as E from 'fp-ts/Either';
import { User } from '@ckm/db';
import * as O from 'fp-ts/Option';
import { UserRole } from '@ckm/db';
import { Auth } from '../decorators/auth.decorator';

@TsRest({ jsonQuery: true })
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @TsRestHandler(contract.users.createUser)
  async createUser() {
    return tsRestHandler(contract.users.createUser, async ({ body }) => {
      return pipe(
        this.userService.createUser(body),
        TE.matchW(
          (error) => ({
            status: 500 as const,
            body: { message: error.message },
          }),
          (user) => ({
            status: 200 as const,
            body: user,
          }),
        ),
      )();
    });
  }

  // @Auth(UserRole.ADMIN)
  @TsRestHandler(contract.users.getUsers)
  async getUsers() {
    return tsRestHandler(contract.users.getUsers, async ({ query }) => {
      return pipe(
        this.userService.getUsers({
          skip: query.skip ? parseInt(query.skip) : undefined,
          take: query.take ? parseInt(query.take) : undefined,
          orderBy: query.orderBy as keyof User | undefined,
        }),
        TE.matchW(
          (error) => ({
            status: 404 as const,
            body: { message: error.message },
          }),
          (user) => ({
            status: 200 as const,
            body: user,
          }),
        ),
      )();
    });
  }

  @TsRestHandler(contract.users.getUser)
  async getUser() {
    return tsRestHandler(contract.users.getUser, async ({ params }) => {
      return pipe(
        this.userService.getUser(params.id),
        TE.matchW(
          (error) => ({
            status: 404 as const,
            body: { message: error.message },
          }),
          (user) => ({
            status: 200 as const,
            body: user,
          }),
        ),
      )();
    });
  }

  @TsRestHandler(contract.users.updateUser)
  async updateUser() {
    return tsRestHandler(
      contract.users.updateUser,
      async ({ params, body }) => {
        return pipe(
          this.userService.updateUser(params.id, body),
          TE.matchW(
            (error) => ({
              status: 404 as const,
              body: { message: error.message },
            }),
            (user) => ({
              status: 200 as const,
              body: user,
            }),
          ),
        )();
      },
    );
  }

  @TsRestHandler(contract.users.deleteUser)
  async deleteUser() {
    return tsRestHandler(contract.users.deleteUser, async ({ params }) => {
      return pipe(
        this.userService.deleteUser(params.id),
        TE.matchW(
          (error) => ({
            status: 404 as const,
            body: { message: error.message },
          }),
          (user) => ({
            status: 200 as const,
            body: user,
          }),
        ),
      )();
    });
  }
}
