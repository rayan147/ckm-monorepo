import { Auth, Prisma, User, UserRole } from '@ckm/db';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../users/users.service';
import { AuthSessionsService, VerifySessionResult } from './utils/auth.sessions.service';
import { PinpointService } from 'src/helpers/aws/pinpoint.service';
import { LoggingService } from 'src/logging/logging.service';
import { EnvService } from 'src/env/env.service';
import { EmailTemplateService } from 'src/templates/email-template.service';



@Injectable()
export class AuthService {
  constructor(
    private readonly envService: EnvService,
    private readonly logger: LoggingService,
    private authSession: AuthSessionsService,
    private userService: UserService,
    private prisma: PrismaService,
    private pinpointService: PinpointService,
    private emailTemplateService: EmailTemplateService

  ) {
  }

  private sortRolesByPriorityOrder(user: User & { auth: Auth[] }) {
    const priorityOrder: UserRole[] = [UserRole.ADMIN, UserRole.MANAGER, UserRole.CHEF, UserRole.STAFF]
    const sortedAuth = [...user.auth].sort((a, b) => {
      return priorityOrder.indexOf(a.role) - priorityOrder.indexOf(b.role)
    })

    return sortedAuth
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.userService.getAuthgUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const sortedAuth = this.sortRolesByPriorityOrder(user)

    for (const authRecord of sortedAuth) {
      const isValid = await bcrypt.compare(password, authRecord.passwordHash);
      if (isValid) {
        return user

      }
    }

    return null
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ success: boolean }> {
    const user = await this.validateUser(email, password);

    const verificationCode = await this.authSession.generatedVerifictionCode();
    const token = await this.authSession.generateSessionToken();

    const htmlBody = this.emailTemplateService.getVerificationCodeTemplate(verificationCode);

    if (!user) {
      throw new BadRequestException('fail to validate user')

    }

    await this.authSession.createSession(token, user.id, false);
    await this.pinpointService.sendEmail(
      user.email,
      'Verification Code Request',
      htmlBody,
    );

    return {
      success: true,
    };
  }

  async verifyLoginCode(
    verficationCode: string,
  ): Promise<VerifySessionResult> {
    return this.authSession.verifySession(verficationCode)
  }

  /**
   * Resends a verification code to the user's email.
   * Invalidates all existing sessions for security purposes to ensure:
   * - Only the most recent verification code is valid
   * - Multiple parallel verification flows are prevented
   * - Potential session hijacking via old codes is mitigated
   */
  async resendCode(email: string): Promise<{ message: string }> {
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    await this.authSession.invalidateSession(user.id)

    const token = await this.authSession.generateSessionToken()
    const verificationCode = await this.authSession.generatedVerifictionCode();

    const htmlBody = this.emailTemplateService.getVerificationCodeTemplate(verificationCode)
    await this.authSession.createSession(token, user.id, false)

    await this.pinpointService.sendEmail(
      user.email,
      'Verification Code Request',
      htmlBody,
    );

    return {
      message: 'Code has been sent',
    };
  }

  async register(data: Prisma.UserCreateInput & { password: string, role?: UserRole }): Promise<User> {
    const existingUser = await this.userService.getUserByEmail(data.email);
    if (existingUser) {
      throw new Error('User exists');
    }
    return this.userService.createUser(data);
  }

  async changePassword(
    userId: number,
    oldPassword: string,
    newPassword: string,
  ): Promise<void> {
    try {
      const user = await this.userService.getAuthUser(userId);
      if (!user || !user.auth || user.auth.length === 0) {
        throw new NotFoundException('User not found or has no auth records');
      }

      await this.validateUser(user.email, oldPassword);

      const hashedNewPassword = await bcrypt.hash(newPassword, 10);

      const sortedAuth = this.sortRolesByPriorityOrder(user)
      const highestPriorityAuth = sortedAuth[0];

      const isSameAsOld = await bcrypt.compare(newPassword, highestPriorityAuth.passwordHash);
      if (isSameAsOld) {
        throw new BadRequestException('New password cannot be the same as the current password');
      }

      await this.prisma.auth.update({
        where: { id: highestPriorityAuth.id },
        data: { passwordHash: hashedNewPassword }
      });

    } catch (error) {
      this.logger.handleError(error, 'Failed to change password');
    }
  }

  async logout(
    userId: number
  ): Promise<void> {
    await this.authSession.invalidateSession(userId)
  }


  async hasRole(userId: number, requiredRole: UserRole): Promise<boolean> {
    const user = await this.userService.getAuthUser(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user.auth.some((auth) => auth.role === requiredRole)
  }


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


  async forgotPassword(email: string): Promise<{ message: string }> {
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }



    const resetToken = this.authSession.createPassowrdResetToken(user.id);
    const env = this.envService.get('NODE_ENV');
    const base_url = env === "prod" ? this.envService.get('BASE_URL') : this.envService.get('BASE_URL_DEV');
    const port = this.envService.get('PORT')
    const resetLink = `${base_url}:${port}/reset-password?token=${resetToken}`;

    const htmlBody = this.emailTemplateService.getPasswordResetTemplate(resetLink);


    await this.pinpointService.sendEmail(
      user.email,
      'Password Reset Request',
      htmlBody,
      `To reset your password, please visit: ${resetLink}`,
    );

    return { message: 'Password reset email sent' };
  }


  async resetPassword(
    resetToken: string,
    newPassword: string,
  ): Promise<{ message: string }> {
    const { isValid, user } = await this.authSession.validatePasswordResetToken(resetToken);

    if (!isValid || !user) {
      throw new UnauthorizedException('Invalid or expired reset token');
    }

    const authUser = await this.userService.getAuthUser(user.id);
    const sortedAuth = this.sortRolesByPriorityOrder(authUser);
    const authToUpdate = sortedAuth[0];

    return this.prisma.$transaction(async (tx) => {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await tx.auth.update({
        where: { id: authToUpdate.id },
        data: { passwordHash: hashedPassword }
      });

      await this.authSession.invalidatePasswordResetTokens(user.id);

      return { message: 'Password successfully reset' };
    });
  }
}

