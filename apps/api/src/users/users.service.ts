import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, Prisma, UserRole } from '@ckm/db';
import * as bcrypt from 'bcrypt';
import { pipe, flow } from 'fp-ts/function';
import * as TE from 'fp-ts/TaskEither';
import * as E from 'fp-ts/Either';
import * as O from 'fp-ts/Option';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  getUserByEmail = (email: string): TE.TaskEither<Error, User> => {
    const performGetUserByEmail = TE.tryCatchK(
      (email: string) => this.prisma.user.findUnique({ where: { email } }),
      E.toError,
    );

    return pipe(
      email,
      performGetUserByEmail,
      TE.flatMap(TE.fromNullable(new NotFoundException('User not found'))),
    );
  };

  getUser = (id: number): TE.TaskEither<Error, User> => {
    const performGetUser = TE.tryCatchK(
      (id: number) => this.prisma.user.findUnique({ where: { id } }),
      E.toError,
    );

    return pipe(
      id,
      performGetUser,
      TE.flatMap(TE.fromNullable(new NotFoundException('User not found'))),
    );
  };

  getUsers = (params: {
    skip?: number;
    take?: number;
    orderBy?: keyof User;
  }): TE.TaskEither<Error, User[]> => {
    const { skip, take, orderBy } = params;
    const performGetUsers = TE.tryCatchK(
      () =>
        this.prisma.user.findMany({
          skip,
          take,
          orderBy: orderBy ? { [orderBy]: 'asc' } : undefined,
        }),
      E.toError,
    );

    return pipe(params, performGetUsers);
  };

  createUser = (
    data: Omit<Prisma.UserCreateInput, 'restaurant' | 'organization'> & {
      restaurantId?: number | null;
      organizationId?: number | null;
    },
  ): TE.TaskEither<Error, User> => {
    const hashPassword = (userData: typeof data) =>
      TE.tryCatch(() => bcrypt.hash(data.passwordHash, 10), E.toError);

    const performUserCreation =
      (passwordHash: string) => (userData: typeof data) => {
        return TE.tryCatch(async () => {
          const { restaurantId, organizationId, ...rest } = userData;
          let createData: Prisma.UserCreateInput = { ...rest, passwordHash };

          if (organizationId) {
            createData.organization = { connect: { id: organizationId } }
          }

          if (restaurantId) {
            createData.restaurant = { connect: { id: restaurantId } }
          }

          return this.prisma.user.create({ data: createData });
        }, E.toError);
      };

    return pipe(
      data,
      hashPassword,
      TE.flatMap((password) => pipe(data, performUserCreation(password))),
    );
  };

  updateUser = (
    userId: number,
    data: Prisma.UserUpdateInput,
  ): TE.TaskEither<Error, User> => {
    const performUpdate = (id: number) => (data: Prisma.UserUpdateInput) =>
      pipe(
        TE.tryCatch(
          () =>
            this.prisma.user.update({
              data,
              where: { id },
            }),
          E.toError,
        ),
      );

    return pipe(data, performUpdate(userId));
  };

  deleteUser = (userId: number): TE.TaskEither<Error, User> => {
    const performUserDeletion = TE.tryCatchK(
      (id: number) => this.prisma.user.delete({ where: { id } }),
      E.toError,
    );

    return pipe(userId, performUserDeletion);
  };

  deleteSession = (
    userId: number,
    sessionToken: string,
  ): TE.TaskEither<Error, O.Option<null>> => {
    const performUserDeletionSession =
      (userId: number) => (sessionToken: string) =>
        TE.tryCatch(
          () =>
            this.prisma.session.delete({
              where: { token: sessionToken, userId: userId },
            }),
          E.toError,
        );

    return pipe(
      sessionToken,
      performUserDeletionSession(userId),
      TE.map(() => O.none),
    );
  };

  updateUserRole = (
    userId: number,
    newRole: UserRole,
  ): TE.TaskEither<Error, User> =>
    pipe(
      TE.tryCatch(
        () =>
          this.prisma.user.update({
            where: { id: userId },
            data: { role: newRole },
          }),
        E.toError,
      ),
    );

  // New method to get users by role
  getUsersByRole = (role: UserRole): TE.TaskEither<Error, User[]> =>
    pipe(
      TE.tryCatch(
        () => this.prisma.user.findMany({ where: { role } }),
        E.toError,
      ),
    );
}
