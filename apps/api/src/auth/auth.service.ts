import { Prisma, User, UserRole } from '@ckm/db';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../users/users.service';
import { AuthSessionsService } from './utils/auth.sessions.service';
import { PinpointService } from 'src/helpers/aws/pinpoint.service';

interface JwtPayload {
  email: string;
  sub: number;
  type: string; // e.g., 'verify_user' or 'password_reset'
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

  /**
   * Validate a user's email and password.
   * @throws UnauthorizedException if the credentials are invalid.
   */
  async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<User, 'passwordHash'>> {
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { passwordHash, ...rest } = user;
    return rest;
  }

  /**
   * Logs the user in by validating credentials, creating a session, and emailing a verification code.
   */
  async login(
    email: string,
    password: string,
  ): Promise<{ code: string; message: string }> {
    // 1. Validate user
    const user = await this.validateUser(email, password);

    // 2. Generate a verification code and session token
    const verificationCode = await this.authSession.generateVerifactionCode();
    const token = await this.authSession.generateSessionToken();

    // 3. Prepare and send the email
    const htmlBody = this.verificationCodeTemplate.replace(
      /{{verificationCode}}/g,
      verificationCode,
    );

    // 4. Create the session
    const session = await this.authSession.createSession(token, user.id);

    // 5. Send email with the code
    await this.pinpointService.sendEmail(
      user.email,
      'Verification Code Request',
      htmlBody,
    );

    return {
      code: session.code,
      message: 'Password reset email sent',
    };
  }

  /**
   * Verifies a login code and issues a signed JWT.
   * @throws UnauthorizedException if session/code is invalid.
   */
  async verifyLoginCode(
    code: string,
  ): Promise<{ accessToken: string; user: Omit<User, 'passwordHash'> }> {
    const session = await this.prisma.session.findUnique({
      where: { code },
      include: { user: true },
    });
    if (!session) {
      throw new UnauthorizedException('Session not found');
    }

    const payload: JwtPayload = {
      email: session.user.email,
      sub: session.user.id,
      type: 'verify_user',
    };

    const accessToken = this.jwtService.sign(payload);

    // Update the session in DB with the new token
    const updatedSession = await this.prisma.session.update({
      where: { code },
      data: { token: accessToken },
      include: { user: true },
    });

    const { passwordHash, ...restUser } = updatedSession.user;
    return { accessToken: updatedSession.token, user: restUser };
  }

  /**
   * Resends a verification code to the user.
   */
  async resendCode(email: string): Promise<{ code: string; message: string }> {
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const verificationCode = await this.authSession.generateVerifactionCode();
    const access_uuid = uuidv4();
    const htmlBody = this.verificationCodeTemplate.replace(
      /{{verificationCode}}/g,
      verificationCode,
    );

    const session = await this.prisma.session.create({
      data: {
        userId: user.id,
        code: verificationCode,
        token: access_uuid,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    await this.pinpointService.sendEmail(
      user.email,
      'Verification Code Request',
      htmlBody,
    );

    return {
      code: session.code,
      message: 'Code has been sent',
    };
  }

  /**
   * Registers a new user, if one with the same email does not already exist.
   */
  async register(data: Prisma.UserCreateInput): Promise<User> {
    const existingUser = await this.userService.getUserByEmail(data.email);
    if (existingUser) {
      throw new Error('User exists');
    }
    return this.userService.createUser(data);
  }

  /**
   * Changes a user's password, given the old password checks out.
   */
  async changePassword(
    userId: number,
    oldPassword: string,
    newPassword: string,
  ): Promise<User> {
    try {
      const user = await this.userService.getUser(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      // Validate old password
      // (If validateUser doesn't throw, the password is correct)
      await this.validateUser(user.email, oldPassword);

      // Hash the new password and update the user
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const updatedUser = await this.userService.updateUser(userId, {
        passwordHash: hashedPassword,
      });

      return updatedUser;
    } catch (error) {
      console.error('Error in changePassword:', error);
      throw error;
    }
  }

  /**
   * Logs the user out by deleting their session token.
   * Adjust return type according to how deleteSession is implemented.
   */
  async logout(
    userId: number,
    sessionToken: string,
  ): Promise<void> {
    await this.userService.deleteSession(userId, sessionToken);
  }

  /**
   * Checks if a user has a required role.
   */
  async hasRole(userId: number, requiredRole: UserRole): Promise<boolean> {
    const user = await this.userService.getUser(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user.role === requiredRole;
  }

  /**
   * Changes another user's role, provided the acting user is an admin.
   */
  async changeUserRole(
    adminUserId: number,
    targetUserId: number,
    newRole: UserRole,
  ): Promise<User> {
    const isAdmin = await this.hasRole(adminUserId, UserRole.ADMIN);
    if (!isAdmin) {
      throw new InternalServerErrorException('Only admins can change user roles');
    }

    return this.userService.updateUserRole(targetUserId, newRole);
  }

  /**
   * Initiates a "forgot password" process by creating a reset token, storing it, and emailing the user.
   */
  async forgotPassword(email: string): Promise<{ message: string }> {
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      // You could decide to make this a silent fail to avoid leaking emails
      throw new NotFoundException('User not found');
    }

    const payload: JwtPayload = {
      email: user.email,
      sub: user.id,
      type: 'password_reset',
    };
    // Expires in 1 hour
    const resetToken = this.jwtService.sign(payload, { expiresIn: '1h' });
    const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;

    const htmlBody = this.passwordResetTemplate.replace(/{{resetLink}}/g, resetLink);

    await this.prisma.passwordReset.create({
      data: {
        userId: user.id,
        token: resetToken,
        expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
      },
    });

    // Send the reset link via email
    await this.pinpointService.sendEmail(
      user.email,
      'Password Reset Request',
      htmlBody,
      `To reset your password, please visit: ${resetLink}`,
    );

    return { message: 'Password reset email sent' };
  }

  /**
   * Resets the user's password after verifying the reset token.
   */
  async resetPassword(
    resetToken: string,
    newPassword: string,
  ): Promise<{ message: string }> {
    // 1. Find the reset token in the DB
    const reset = await this.prisma.passwordReset.findUnique({
      where: { token: resetToken },
      include: { user: true },
    });
    if (!reset) {
      throw new UnauthorizedException('Invalid reset token');
    }

    // 2. Check if the token is expired
    if (reset.expiresAt < new Date()) {
      throw new UnauthorizedException('Expired reset token');
    }

    // 3. Verify the token's payload
    try {
      const payload = this.jwtService.verify(resetToken) as JwtPayload;
      if (payload.type !== 'password_reset' || payload.sub !== reset.user.id) {
        throw new UnauthorizedException('Invalid token type or user mismatch');
      }
    } catch (error) {
      throw new UnauthorizedException('Invalid JWT token');
    }

    // 4. Hash the new password and update the user
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.userService.updateUser(reset.user.id, {
      passwordHash: hashedPassword,
    });

    // 5. Delete all password reset records for this user
    await this.prisma.passwordReset.deleteMany({
      where: { userId: reset.user.id },
    });

    return { message: 'Password successfully reset' };
  }
}

