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
    private emailTemplateService: EmailTemplateService,
  ) {}

  private sortRolesByPriorityOrder(user: User & { auth: Auth[] }) {
    const priorityOrder: UserRole[] = [
      UserRole.ADMIN,
      UserRole.MANAGER,
      UserRole.CHEF,
      UserRole.STAFF,
    ];
    const sortedAuth = [...user.auth].sort((a, b) => {
      return priorityOrder.indexOf(a.role) - priorityOrder.indexOf(b.role);
    });

    return sortedAuth;
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    try {
      const startTime = Date.now();

      const user = await this.userService.getAuthUserByEmail(email);

      if (!user) {
        await bcrypt.compare(password, '$2a$10$invalidhashinvalidhashinvalid');

        const elapsedTime = Date.now() - startTime;
        if (elapsedTime < 500) {
          await new Promise(resolve => setTimeout(resolve, 500 - elapsedTime));
        }

        this.logger.log(`Failed login attempt for email: ${email}`);
        return null;
      }

      const sortedAuth = this.sortRolesByPriorityOrder(user);

      for (const authRecord of sortedAuth) {
        const isValid = await bcrypt.compare(password, authRecord.passwordHash);
        if (isValid) {
          const elapsedTime = Date.now() - startTime;
          if (elapsedTime < 500) {
            await new Promise(resolve => setTimeout(resolve, 500 - elapsedTime));
          }

          return user;
        }
      }

      const elapsedTime = Date.now() - startTime;
      if (elapsedTime < 500) {
        await new Promise(resolve => setTimeout(resolve, 500 - elapsedTime));
      }

      this.logger.log(`Failed login attempt for existing user: ${email}`);
      return null;
    } catch (error) {
      this.logger.handleError(error, 'Error validating user credentials');
    }
  }

  async login(email: string, password: string): Promise<{ success: boolean }> {
    try {
      const user = await this.validateUser(email, password);

      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      await this.authSession.invalidateSession(user.id);

      const verificationCode = await this.authSession.generatedVerifictionCode();
      const token = await this.authSession.generateSessionToken();

      const htmlBody = this.emailTemplateService.getVerificationCodeTemplate(verificationCode);

      const TEN_MINUTES = new Date(Date.now() + 10 * 60 * 1000);
      await this.authSession.createSession(token, user.id, false, TEN_MINUTES);

      await this.pinpointService.sendEmail(user.email, 'Verification Code Request', htmlBody);

      this.logger.log(`Login initiated for user: ${user.email} (ID: ${user.id})`);

      return {
        success: true,
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }

      this.logger.handleError(error, 'Login process failed');
    }
  }

  async verifyLoginCode(verificationCode: string): Promise<VerifySessionResult> {
    try {
      await new Promise(resolve => setTimeout(resolve, 100));
      const result = await this.authSession.verifySession(verificationCode);
      this.logger.log(`Successful verification for user ID: ${result.user.id}`);

      return result;
    } catch (error) {
      this.logger.handleError(error, 'Verification code validation failed');
    }
  }

  async resendCode(email: string): Promise<{ message: string }> {
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    await this.authSession.invalidateSession(user.id);

    const token = await this.authSession.generateSessionToken();
    const verificationCode = await this.authSession.generatedVerifictionCode();

    const TEN_MINUTES = new Date(Date.now() + 10 * 60 * 1000);
    const htmlBody = this.emailTemplateService.getVerificationCodeTemplate(verificationCode);
    await this.authSession.createSession(token, user.id, false, TEN_MINUTES);

    await this.pinpointService.sendEmail(user.email, 'Verification Code Request', htmlBody);

    return {
      message: 'Code has been sent',
    };
  }

  async register(
    data: Prisma.UserCreateInput & {
      password: string;
      role?: UserRole;
      isOrganization?: boolean;
      organizationInput?: { name: string; imageUrl?: string };
      restaurantsInput?: Array<{
        name: string;
        imageUrl?: string;
        address: string;
        city: string;
        zipCode: string;
        state: string;
        owner: string;
      }>;
    },
  ): Promise<User> {
    const existingUser = await this.userService.getUserByEmail(data.email);
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const { password, role, isOrganization, organizationInput, restaurantsInput, ...userData } =
      data;

    return this.userService.createUser({
      password,
      role,
      ...userData,
      isOrganization,
      organizationInput,
      restaurantsInput,
    });
  }

  async changePassword(userId: number, oldPassword: string, newPassword: string): Promise<void> {
    try {
      const user = await this.userService.getAuthUser(userId);
      if (!user || !user.auth || user.auth.length === 0) {
        throw new NotFoundException('User not found or has no auth records');
      }

      await this.validateUser(user.email, oldPassword);

      const hashedNewPassword = await bcrypt.hash(newPassword, 10);

      const sortedAuth = this.sortRolesByPriorityOrder(user);
      const highestPriorityAuth = sortedAuth[0];

      const isSameAsOld = await bcrypt.compare(newPassword, highestPriorityAuth.passwordHash);
      if (isSameAsOld) {
        throw new BadRequestException('New password cannot be the same as the current password');
      }

      await this.prisma.auth.update({
        where: { id: highestPriorityAuth.id },
        data: { passwordHash: hashedNewPassword },
      });
    } catch (error) {
      this.logger.handleError(error, 'Failed to change password');
    }
  }

  async logout(userId: number): Promise<void> {
    console.log('AuthService: Logout called for userId:', userId);
    try {
      await this.authSession.invalidateSession(userId);
      console.log('AuthService: Successfully invalidated sessions');
    } catch (error) {
      console.error('AuthService: Error in logout method:', error);
      throw error;
    }
  }

  async hasRole(userId: number, requiredRole: UserRole): Promise<boolean> {
    const user = await this.userService.getAuthUser(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user.auth.some(auth => auth.role === requiredRole);
  }

  async changeUserRole(
    adminUserId: number,
    targetUserId: number,
    newRole: UserRole,
  ): Promise<User | null> {
    const isAdmin = await this.hasRole(adminUserId, UserRole.ADMIN);
    if (!isAdmin) {
      throw new InternalServerErrorException('Only admins can change user roles');
    }

    const updatedUser = this.userService.updateUserRole(targetUserId, newRole);

    if (!updatedUser) {
      throw new BadRequestException('User not found');
    }
    return updatedUser;
  }

  async forgotPassword(email: string): Promise<{ message: string }> {
    try {
      const startTime = Date.now();

      await new Promise(resolve => setTimeout(resolve, 150));

      const user = await this.userService.getUserByEmail(email);

      if (!user) {
        await new Promise(resolve => setTimeout(resolve, 200));
        this.logger.log(`Password reset requested for non-existent email: ${email}`);
        return {
          message:
            'If your email exists in our system, you will receive password reset instructions.',
        };
      }

      const resetToken = await this.authSession.createPasswordResetToken(user.id);
      const env = this.envService.get('NODE_ENV');
      const base_url =
        env === 'prod' ? this.envService.get('BASE_URL') : this.envService.get('BASE_URL_DEV');
      const port = this.envService.get('PORT');

      const protocol = env === 'prod' ? 'https' : 'http';
      const host = base_url.replace(/^https?:\/\//, ''); // Remove any existing protocol
      const resetLink = `${protocol}://${host}${port ? ':' + port : ''}/reset-password?token=${resetToken}`;

      const htmlBody = this.emailTemplateService.getPasswordResetTemplate(resetLink);

      await this.pinpointService.sendEmail(
        user.email,
        'Password Reset Request',
        htmlBody,
        `To reset your password, please visit: ${resetLink}`,
      );

      this.logger.log(`Password reset requested for user ID: ${user.id}`);

      const elapsedTime = Date.now() - startTime;
      if (elapsedTime < 500) {
        await new Promise(resolve => setTimeout(resolve, 500 - elapsedTime));
      }

      return {
        message:
          'If your email exists in our system, you will receive password reset instructions.',
      };
    } catch (error) {
      this.logger.handleError(error, 'Password reset request failed');
    }
  }

  async resetPassword(resetToken: string, newPassword: string): Promise<{ message: string }> {
    try {
      await new Promise(resolve => setTimeout(resolve, 200));

      if (!newPassword || newPassword.length < 8) {
        throw new BadRequestException('Password must be at least 8 characters long');
      }

      const { isValid, user } = await this.authSession.validatePasswordResetToken(resetToken);

      if (!isValid || !user) {
        throw new UnauthorizedException('Invalid or expired reset token');
      }

      const authUser = await this.userService.getAuthUser(user.id);
      const sortedAuth = this.sortRolesByPriorityOrder(authUser);
      const authToUpdate = sortedAuth[0];

      const isSameAsOld = await bcrypt.compare(newPassword, authToUpdate.passwordHash);
      if (isSameAsOld) {
        throw new BadRequestException('New password cannot be the same as current password');
      }

      return this.prisma.$transaction(async tx => {
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await tx.auth.update({
          where: { id: authToUpdate.id },
          data: { passwordHash: hashedPassword },
        });

        await this.authSession.invalidatePasswordResetTokens(user.id);
        await this.authSession.invalidateSession(user.id);

        this.logger.log(`Password reset completed for user ID: ${user.id}`);

        return { message: 'Password successfully reset' };
      });
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof UnauthorizedException) {
        throw error; // Rethrow validation errors
      }
      this.logger.handleError(error, 'Password reset failed');
    }
  }
}
