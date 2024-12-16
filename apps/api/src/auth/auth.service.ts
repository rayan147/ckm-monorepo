import { Prisma, Session, User, UserRole } from '@ckm/db';
import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';
import * as IO from 'fp-ts/IO';
import * as T from 'fp-ts/lib/Task';
import * as O from 'fp-ts/Option';
import * as TE from 'fp-ts/TaskEither';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../users/users.service';
import { AuthSessionsService } from './utils/auth.sessions.service';
import { PinpointService } from 'src/helpers/aws/pinpoint.service';

interface JwtPayload {
  email: string;
  sub: number;
  type: string;
}

@Injectable()
export class AuthService {
  private readonly passwordResetTemplate: string;
  private readonly verificationCodeTemplate: string;

  constructor(
    private authSession: AuthSessionsService,
    private userService: UserService,
    private prisma: PrismaService,
    private jwtService: JwtService,
    private pinpointService: PinpointService,
  ) {
    this.passwordResetTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f8f8; border-radius: 5px;">
        <tr>
            <td style="padding: 20px;">
                <h1 style="color: #4a4a4a; text-align: center;">Password Reset Request</h1>
                <p style="margin-bottom: 20px;">Hello,</p>
                <p>We received a request to reset your password. If you didn't make this request, you can ignore this email.</p>
                <p>To reset your password, click the button below:</p>
                <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                        <td align="center" style="padding: 20px 0;">
                            <a href="{{resetLink}}" style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
                        </td>
                    </tr>
                </table>
                <p>This link will expire in 1 hour for security reasons.</p>
                <p>If you're having trouble clicking the button, copy and paste the URL below into your web browser:</p>
                <p style="word-break: break-all; color: #4a4a4a;">{{resetLink}}</p>
                <p style="margin-top: 20px;">Best regards,<br>Your App Team</p>
            </td>
        </tr>
    </table>
</body>
</html>
    `;


    this.verificationCodeTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verification Code</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4;">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <tr>
            <td style="padding: 40px;">
                <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                        <td align="center" style="padding-bottom: 30px;">
                            <img src="./images/chef.svg" alt="Logo" style="max-width: 100px; height: auto;">
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h1 style="color: #2c3e50; text-align: center; margin-bottom: 30px; font-size: 28px;">Verification Code</h1>
                            <p style="margin-bottom: 20px; font-size: 16px;">Hello,</p>
                            <p style="margin-bottom: 30px; font-size: 16px;">We received a request to send you a verification code. If you didn't make this request, you can ignore this email.</p>
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td align="center" style="padding: 20px 0;">
                                        <div style="background-color: #3498db; color: white; padding: 15px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 24px; display: inline-block;">{{verificationCode}}</div>
                                    </td>
                                </tr>
                            </table>
                            <p style="margin-top: 30px; font-size: 16px;">If you have any questions, please don't hesitate to contact our support team.</p>
                            <p style="margin-top: 30px; font-size: 16px;">Best regards,<br>Your App Team</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td style="background-color: #2c3e50; color: #ffffff; text-align: center; padding: 20px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
                <p style="margin: 0; font-size: 14px;">&copy; 2024 Your App. All rights reserved.</p>
            </td>
        </tr>
    </table>
</body>
</html>
    `;
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
  ): TE.TaskEither<Error, { code: string; message: string }> => {
    const performLoginProcess = (
      user: Omit<User, 'passwordHash'>
    ): TE.TaskEither<Error, Session> => {
      return pipe(
        TE.Do,
        // Get the verification code (string)
        TE.bind('verificationCode', () =>
          TE.tryCatch<Error, string>(
            () => Promise.resolve(this.authSession.generateVerifactionCode()),
            E.toError
          )
        ),
        // Get the session token (string)
        TE.bind('token', () =>
          TE.tryCatch(
            () => Promise.resolve(this.authSession.generateSessionToken()),
            E.toError
          )
        ),
        // Now that we have verificationCode and token as strings, we can build the HTML and create a session
        TE.bind('session', ({ verificationCode, token }) => {
          const htmlBody = this.verificationCodeTemplate.replace(
            /{{verificationCode}}/g,
            verificationCode
          );

          return pipe(
            // Create the session
            TE.tryCatch<Error, Session>(
              () => this.authSession.createSession(token, user.id),
              E.toError
            ),
            // Send the email after session is created
            TE.chainFirst((session) =>
              TE.tryCatch(
                () =>
                  this.pinpointService.sendEmail(
                    user.email,
                    'Verification Code Request',
                    htmlBody
                  ),
                E.toError
              )
            )
          );
        }),
        // Finally, return the session
        TE.map(({ session }) => session)
      );
    };

    return pipe(
      this.validateUser(email, password),
      TE.flatMap((user) => performLoginProcess(user)),
      TE.map((session) => ({
        code: session.code,
        message: 'Password reset email sent',
      }))
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
      const htmlBody = this.verificationCodeTemplate.replace(
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

      const htmlBody = this.passwordResetTemplate.replace(/{{resetLink}}/g, resetLink);

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
