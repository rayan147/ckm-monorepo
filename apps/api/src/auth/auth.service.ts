import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/users.service';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, UserRole } from '@ckm/db';
import { PinpointService } from 'src/pinpoint/pinpoint.service';
import * as bcrypt from 'bcrypt';
import { User, Session } from '@ckm/db';
import { pipe } from 'fp-ts/function';
import * as TE from 'fp-ts/TaskEither';
import * as E from 'fp-ts/Either';
import * as O from 'fp-ts/Option';
import * as IO from 'fp-ts/IO';
import * as T from 'fp-ts/lib/Task';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { EnvService } from 'src/env/env.service';

interface JwtPayload {
  email: string;
  sub: number;
  type: string;
}

@Injectable()
export class AuthService {
  private readonly emailTemplate: string;
  private readonly codeTemplate: string;

  constructor(
    private userService: UserService,
    private prisma: PrismaService,
    private jwtService: JwtService,
    private pinpointService: PinpointService,
    private envService: EnvService,
  ) {
    // Load the email template
    this.emailTemplate = fs.readFileSync(
      path.join(
        process.cwd(),
        './src/auth/templates/password-reset-email.html',
      ),
      'utf8',
    );
    this.codeTemplate = fs.readFileSync(
      path.join(
        process.cwd(),
        './src/auth/templates/verification-code-email.html',
      ),
      'utf8',
    );
  }

  private generateVerificationCode: IO.IO<string> = IO.of(() =>
    Math.floor(100000 + Math.random() * 900000).toString(),
  )();

  validateUser = (
    email: string,
    password: string,
  ): TE.TaskEither<Error, Omit<User, 'passwordHash'>> => {
    const performValidatePassword = (user: User) =>
      pipe(
        TE.tryCatch(
          () => bcrypt.compare(password, user.passwordHash),
          E.toError,
        ),
        TE.chainW(
          TE.fromPredicate(
            (isValid) => isValid,
            () => new InternalServerErrorException('Invalid credentials'),
          ),
        ),
        TE.map(() => user),
      );

    return pipe(
      this.userService.getUserByEmail(email),
      TE.chainW((user) => performValidatePassword(user)),
      TE.map((user) => user),
    );
  };

  login = (
    email: string,
    password: string,
  ): TE.TaskEither<Error, { code: string }> => {
    const performLoginProcess = (user: Omit<User, 'passwordHash'>) => {
      const verificationCode = this.generateVerificationCode();
      const access_uuid = uuidv4();
      const htmlBody = this.codeTemplate.replace(
        /{{verificationCode}}/g,
        verificationCode,
      );

      return pipe(
        TE.tryCatch(
          () =>
            this.prisma.session.create({
              data: {
                userId: user.id,
                code: verificationCode,
                token: access_uuid,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
              },
            }),
          E.toError,
        ),
        TE.chainFirst(() =>
          TE.tryCatch(
            () =>
              this.pinpointService.sendEmail(
                user.email,
                'Verification Code Request',
                htmlBody,
              ),
            E.toError,
          ),
        ),
        TE.map((user) => user),
      );
    };

    return pipe(
      this.validateUser(email, password),
      TE.flatMap((user) => performLoginProcess(user)),
      TE.map((session) => ({
        code: session.code,
        message: 'Password reset email sent',
      })),
    );
  };

  verifyLoginCode = (
    code: string,
  ): TE.TaskEither<
    Error,
    { accessToken: string; user: Omit<User, 'passwordHash'> }
  > => {
    const findUserByCode = (code: string) => {
      return TE.tryCatch(
        () =>
          this.prisma.session.findUnique({
            where: { code: code },
            include: { user: true },
          }),
        E.toError,
      );
    };

    const performVerifyingProcess = (
      session: {
        user: User;
      } & Session,
    ) => {
      const payload = {
        email: session.user.email,
        sub: session.user.id,
        type: 'verify_user',
      } satisfies JwtPayload;

      console.log({ payload })

      const accessToken = this.jwtService.sign(payload);

      return TE.tryCatch(
        () =>
          this.prisma.session.update({
            where: {
              code: code,
            },
            data: {
              token: accessToken,
            },
            include: { user: true }, // Include user in the updated session
          }),
        E.toError,
      );
    };

    return pipe(
      findUserByCode(code),
      TE.chainW(
        TE.fromNullable(new UnauthorizedException('Session not found')),
      ),
      TE.chainW((session) => performVerifyingProcess(session)),
      TE.map((session) => ({
        accessToken: session.token,
        user: { ...session.user, passwordHash: undefined },
      })),
    );
  };

  resendCode = (
    email: string
  ): TE.TaskEither<Error, { code: string }> => {
    const performLoginProcess = (user: Omit<User, 'passwordHash'>) => {
      const verificationCode = this.generateVerificationCode();
      const access_uuid = uuidv4();
      const htmlBody = this.codeTemplate.replace(
        /{{verificationCode}}/g,
        verificationCode,
      );

      return pipe(
        TE.tryCatch(
          () =>
            this.prisma.session.create({
              data: {
                userId: user.id,
                code: verificationCode,
                token: access_uuid,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
              },
            }),
          E.toError,
        ),
        TE.chainFirst(() =>
          TE.tryCatch(
            () =>
              this.pinpointService.sendEmail(
                user.email,
                'Verification Code Request',
                htmlBody,
              ),
            E.toError,
          ),
        ),
        TE.map((user) => user),
      );
    };

    return pipe(
      this.userService.getUserByEmail(email),
      TE.flatMap((user) => performLoginProcess(user)),
      TE.map((session) => ({
        code: session.code,
        message: 'Code has been sent',
      })),
    );

  }

  register = (
    data: Prisma.UserCreateInput,
  ): TE.TaskEither<Error, User> => {
    const userExist = (email: string): T.Task<boolean> =>
      pipe(
        this.userService.getUserByEmail(email),
        TE.match(
          () => false,
          () => true,
        ),
      );
    return pipe(
      userExist(data.email),
      T.flatMap((exists) =>
        exists
          ? TE.left(new Error('User exists'))
          : this.userService.createUser(data),
      ),
    );
  };

  changePassword = (
    userId: number,
    oldPassword: string,
    newPassword: string,
  ): TE.TaskEither<Error, User> =>
    pipe(
      this.userService.getUser(userId),
      TE.flatMap((user) =>
        pipe(
          this.validateUser(user.email, oldPassword),
          TE.tryCatchK(() => bcrypt.hash(newPassword, 10), E.toError),
        ),
      ),
      TE.flatMap((hashedPassword) =>
        this.userService.updateUser(userId, { passwordHash: hashedPassword }),
      ),
      TE.mapLeft((error) => {
        console.error('Error in changePassword:', error);
        return error;
      }),
    );

  logout = (
    userId: number,
    sessionToken: string,
  ): TE.TaskEither<Error, O.Option<null>> =>
    this.userService.deleteSession(userId, sessionToken);

  hasRole = (
    userId: number,
    requiredRole: UserRole,
  ): TE.TaskEither<Error, boolean> =>
    pipe(
      this.userService.getUser(userId),
      TE.map((user) => user.role === requiredRole),
    );

  changeUserRole = (
    adminUserId: number,
    targetUserId: number,
    newRole: UserRole,
  ): TE.TaskEither<Error, User> =>
    pipe(
      this.hasRole(adminUserId, UserRole.ADMIN),
      TE.chainW(
        TE.fromPredicate(
          (isAdmin) => isAdmin,
          () =>
            new InternalServerErrorException(
              'Only admins can change user roles',
            ),
        ),
      ),
      TE.flatMap(() => this.userService.updateUserRole(targetUserId, newRole)),
    );

  forgotPassword = (
    email: string,
  ): TE.TaskEither<Error, { message: string }> => {
    const performTokenRest = (user: User) => {
      const payload = {
        email: user.email,
        sub: user.id,
        type: 'password_reset',
      } satisfies JwtPayload;

      const resetToken = this.jwtService.sign(payload, { expiresIn: '1h' });
      const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;

      const htmlBody = this.emailTemplate.replace(/{{resetLink}}/g, resetLink);

      return pipe(
        TE.tryCatch(
          () =>
            this.prisma.passwordReset.create({
              data: {
                userId: user.id,
                token: resetToken,
                expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
              },
            }),
          E.toError,
        ),
        TE.chainFirst(() =>
          TE.tryCatch(
            () =>
              this.pinpointService.sendEmail(
                user.email,
                'Password Reset Request',
                htmlBody,
                `To reset your password, please visit: ${resetLink}`,
              ),
            E.toError,
          ),
        ),
        TE.map(() => ({ message: 'Password reset email sent' })),
      );
    };

    return pipe(
      this.userService.getUserByEmail(email),
      TE.chainW((user) => performTokenRest(user)),
    );
  };
  resetPassword = (
    resetToken: string,
    newPassword: string,
  ): TE.TaskEither<Error, { message: string }> =>
    pipe(
      TE.tryCatch(
        () =>
          this.prisma.passwordReset.findUnique({
            where: { token: resetToken },
            include: { user: true },
          }),
        () => new UnauthorizedException('Failed to fetch reset token'),
      ),
      TE.chain(
        TE.fromNullable(new UnauthorizedException('Invalid reset token')),
      ),
      TE.chain((reset) =>
        reset.expiresAt > new Date()
          ? TE.right(reset)
          : TE.left(new UnauthorizedException('Expired reset token')),
      ),
      TE.chain((reset) =>
        pipe(
          TE.tryCatch(
            () => Promise.resolve(this.jwtService.verify(resetToken)),
            () => new UnauthorizedException('Invalid JWT token'),
          ),
          TE.chain((payload) =>
            payload.type === 'password_reset' && payload.sub === reset.user.id
              ? TE.right(reset.user)
              : TE.left(
                new UnauthorizedException(
                  'Invalid token type or user mismatch',
                ),
              ),
          ),
        ),
      ),

      TE.chain((user) =>
        pipe(
          TE.tryCatch(
            () => bcrypt.hash(newPassword, 10),
            () => new UnauthorizedException('Failed to hash password'),
          ),
          TE.chain((hashedPassword) =>
            this.userService.updateUser(user.id, {
              passwordHash: hashedPassword,
            }),
          ),
        ),
      ),
      TE.flatMap((user) =>
        TE.tryCatch(
          () =>
            this.prisma.passwordReset.deleteMany({
              where: { userId: user.id },
            }),
          () =>
            new UnauthorizedException('Failed to delete password reset tokens'),
        ),
      ),
      TE.map(() => ({ message: 'Password successfully reset' })),
    );
} // end of region
