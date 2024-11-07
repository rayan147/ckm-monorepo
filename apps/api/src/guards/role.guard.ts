import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User, UserRole } from '@ckm/db';
import * as TE from 'fp-ts/TaskEither';
import * as T from 'fp-ts/Task';
import { pipe } from 'fp-ts/function';
import * as E from 'fp-ts/Either';
import { PrismaService } from '../prisma/prisma.service';
import * as O from 'fp-ts/Option';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const getRequiredRoles = (): E.Either<Error, UserRole[]> =>
      pipe(
        O.fromNullable(
          this.reflector.getAllAndOverride<UserRole[]>('roles', [
            context.getHandler(),
            context.getClass(),
          ]),
        ),
        O.fold(
          () => E.left(new UnauthorizedException('No roles required')),
          E.right,
        ),
      );

    const request = context.switchToHttp().getRequest();
    const user: User = request.user;

    const isUserSub = (user: User): O.Option<number> =>
      pipe(O.fromNullable(user.sub));

    const findUser = (sub: number) =>
      TE.tryCatch(
        () => this.prisma.user.findUnique({ where: { id: sub } }),
        E.toError,
      );

    return pipe(
      getRequiredRoles(),
      E.fold(
        () => T.of(true), // If no roles are required, allow access
        (requiredRoles) =>
          pipe(
            isUserSub(user),
            O.fold(
              () => T.of(false),
              (sub) =>
                pipe(
                  findUser(sub),
                  TE.chain(
                    TE.fromNullable(new Error('User not found in database')),
                  ),
                  TE.map((dbUser) => requiredRoles.includes(dbUser.role)),
                  TE.getOrElse(() => T.of(false)),
                ),
            ),
          ),
      ),
    )();
  }
}
