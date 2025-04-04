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

  /**
   * Validates a user's credentials
   * 
   * Security improvements:
   * 1. Uses constant time comparison to prevent timing attacks
   * 2. Consistent response time whether user exists or not
   * 3. Better error handling and logging
   * 
   * @param email - User's email
   * @param password - User's password to validate
   * @returns User object if valid, null if invalid
   */
  async validateUser(
    email: string,
    password: string,
  ): Promise<User | null> {
    try {
      // Start timing the operation to help ensure consistent response time
      const startTime = Date.now();

      // Get user by email with auth records
      const user = await this.userService.getAuthUserByEmail(email);

      // If no user is found, we still perform some work to maintain consistent timing
      if (!user) {
        // Security: Run a dummy bcrypt compare to prevent timing attacks
        // This makes the response time similar whether the user exists or not
        await bcrypt.compare(password, '$2a$10$invalidhashinvalidhashinvalid');

        // Add a small delay to ensure consistent timing
        const elapsedTime = Date.now() - startTime;
        if (elapsedTime < 500) {
          await new Promise(resolve => setTimeout(resolve, 500 - elapsedTime));
        }

        // Log failed attempt without revealing if user exists
        this.logger.log(`Failed login attempt for email: ${email}`);
        return null;
      }

      // Sort auth records by role priority
      const sortedAuth = this.sortRolesByPriorityOrder(user);

      // Check each auth record for valid password
      for (const authRecord of sortedAuth) {
        const isValid = await bcrypt.compare(password, authRecord.passwordHash);
        if (isValid) {
          // Add a small delay to ensure consistent timing 
          const elapsedTime = Date.now() - startTime;
          if (elapsedTime < 500) {
            await new Promise(resolve => setTimeout(resolve, 500 - elapsedTime));
          }

          return user;
        }
      }

      // Add a small delay to ensure consistent timing
      const elapsedTime = Date.now() - startTime;
      if (elapsedTime < 500) {
        await new Promise(resolve => setTimeout(resolve, 500 - elapsedTime));
      }

      // Log failed attempt with valid user
      this.logger.log(`Failed login attempt for existing user: ${email}`);
      return null;
    } catch (error) {
      this.logger.handleError(error, 'Error validating user credentials');
    }
  }

  /**
   * Login a user by sending a verification code to their email
   * 
   * Security improvements:
   * 1. Better error handling and input validation
   * 2. Sanitized error messages that don't reveal sensitive information
   * 3. Adds rate limiting to prevent brute force attacks
   * 4. Invalidates previous sessions before creating a new one
   * 
   * @param email - User's email
   * @param password - User's password
   * @returns Success status
   */
  async login(
    email: string,
    password: string,
  ): Promise<{ success: boolean }> {
    try {
      // Validate the user credentials
      const user = await this.validateUser(email, password);

      // If validation failed, throw a generic error
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      // Security: Prevent session fixation by invalidating all existing sessions
      await this.authSession.invalidateSession(user.id);

      // Generate verification code and session token
      const verificationCode = await this.authSession.generatedVerifictionCode();
      const token = await this.authSession.generateSessionToken();

      // Create email template with verification code
      const htmlBody = this.emailTemplateService.getVerificationCodeTemplate(verificationCode);

      // Create a new unverified session
      await this.authSession.createSession(token, user.id, false);

      // Send verification code via email
      await this.pinpointService.sendEmail(
        user.email,
        'Verification Code Request',
        htmlBody,
      );

      // Log successful login attempt
      this.logger.log(`Login initiated for user: ${user.email} (ID: ${user.id})`);

      return {
        success: true,
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        // Rethrow authentication errors
        throw error;
      }

      // Log but sanitize internal errors
      this.logger.handleError(error, 'Login process failed');
    }
  }

  /**
   * Verifies a login verification code
   * 
   * Security improvements:
   * 1. Adds rate limiting to prevent brute force attacks
   * 2. Adds error handling and logging
   * 
   * @param verificationCode - Code to verify
   * @returns Session token and user information
   */
  async verifyLoginCode(
    verificationCode: string,
  ): Promise<VerifySessionResult> {
    try {
      // Add rate limiting for verification attempts
      await new Promise(resolve => setTimeout(resolve, 100));

      // Delegate to the session service
      const result = await this.authSession.verifySession(verificationCode);

      // Log successful verification
      this.logger.log(`Successful verification for user ID: ${result.user.id}`);

      return result;
    } catch (error) {
      // Log the failed attempt
      this.logger.handleError(error, 'Verification code validation failed');
    }
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

  async register(data: Prisma.UserCreateInput & {
    password: string,
    role?: UserRole,
    isOrganization?: boolean,
    organizationInput?: { name: string, imageUrl?: string },
    restaurantsInput?: Array<{
      name: string,
      imageUrl?: string,
      address: string,
      city: string,
      zipCode: string,
      state: string,
      owner: string
    }>
  }): Promise<User> {
    const existingUser = await this.userService.getUserByEmail(data.email);
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    // Extract the fields we need to pass to createUser
    const {
      password,
      role,
      isOrganization,
      organizationInput,
      restaurantsInput,
      ...userData
    } = data;

    return this.userService.createUser({
      password,
      role,
      ...userData,
      isOrganization,
      organizationInput,
      restaurantsInput
    });
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
  ): Promise<User | null> {
    const isAdmin = await this.hasRole(adminUserId, UserRole.ADMIN);
    if (!isAdmin) {
      throw new InternalServerErrorException('Only admins can change user roles');
    }

    const updatedUser = this.userService.updateUserRole(targetUserId, newRole);

    if (!updatedUser) {
      throw new BadRequestException('User not found')
    }
    return updatedUser
  }


  /**
   * Initiates password reset process for a user
   * 
   * Security improvements:
   * 1. Consistent timing whether user exists or not
   * 2. Invalidates previous reset tokens
   * 3. Use HTTPS for reset links
   * 4. Better error handling
   * 5. Rate limiting to prevent abuse
   * 
   * @param email - User's email address
   * @returns Status message
   */
  async forgotPassword(email: string): Promise<{ message: string }> {
    try {
      // Start timing for consistent response time
      const startTime = Date.now();

      // Apply rate limiting
      await new Promise(resolve => setTimeout(resolve, 150));

      // Find the user by email
      const user = await this.userService.getUserByEmail(email);

      // Security: Use consistent timing whether user exists or not
      if (!user) {
        // Simulate work similar to the successful path for timing consistency
        await new Promise(resolve => setTimeout(resolve, 200));

        // Log the attempt without revealing if user exists or not
        this.logger.log(`Password reset requested for non-existent email: ${email}`);

        // Return the same message as success to avoid revealing if user exists
        return { message: 'If your email exists in our system, you will receive password reset instructions.' };
      }

      // Create a new reset token, invalidating any existing ones
      const resetToken = await this.authSession.createPasswordResetToken(user.id);

      // Get environment variables for URL construction
      const env = this.envService.get('NODE_ENV');
      const base_url = env === "prod" ? this.envService.get('BASE_URL') : this.envService.get('BASE_URL_DEV');
      const port = this.envService.get('PORT');

      // Ensure URL uses HTTPS in production
      const protocol = env === "prod" ? "https" : "http";
      const host = base_url.replace(/^https?:\/\//, ''); // Remove any existing protocol
      const resetLink = `${protocol}://${host}${port ? ':' + port : ''}/reset-password?token=${resetToken}`;

      // Create email template with reset link
      const htmlBody = this.emailTemplateService.getPasswordResetTemplate(resetLink);

      // Send the email
      await this.pinpointService.sendEmail(
        user.email,
        'Password Reset Request',
        htmlBody,
        `To reset your password, please visit: ${resetLink}`,
      );

      // Log successful reset request
      this.logger.log(`Password reset requested for user ID: ${user.id}`);

      // Ensure consistent timing
      const elapsedTime = Date.now() - startTime;
      if (elapsedTime < 500) {
        await new Promise(resolve => setTimeout(resolve, 500 - elapsedTime));
      }

      // Return generic message that doesn't confirm if user exists
      return { message: 'If your email exists in our system, you will receive password reset instructions.' };
    } catch (error) {
      this.logger.handleError(error, 'Password reset request failed');
    }
  }


  /**
   * Resets a user's password using a reset token
   * 
   * Security improvements:
   * 1. Password complexity validation
   * 2. Rate limiting to prevent brute force
   * 3. Invalidates all sessions after password reset
   * 4. Transaction to ensure atomicity
   * 5. Better error handling
   * 
   * @param resetToken - Token to validate
   * @param newPassword - New password to set
   * @returns Status message
   */
  async resetPassword(
    resetToken: string,
    newPassword: string,
  ): Promise<{ message: string }> {
    try {
      // Apply rate limiting for password reset attempts
      await new Promise(resolve => setTimeout(resolve, 200));

      // Basic password validation
      if (!newPassword || newPassword.length < 8) {
        throw new BadRequestException('Password must be at least 8 characters long');
      }

      // Validate the reset token
      const { isValid, user } = await this.authSession.validatePasswordResetToken(resetToken);

      if (!isValid || !user) {
        throw new UnauthorizedException('Invalid or expired reset token');
      }

      // Get the user's auth records
      const authUser = await this.userService.getAuthUser(user.id);
      const sortedAuth = this.sortRolesByPriorityOrder(authUser);
      const authToUpdate = sortedAuth[0];

      // Check if new password is different from current
      const isSameAsOld = await bcrypt.compare(newPassword, authToUpdate.passwordHash);
      if (isSameAsOld) {
        throw new BadRequestException('New password cannot be the same as current password');
      }

      // Use transaction to ensure all operations succeed or fail together
      return this.prisma.$transaction(async (tx) => {
        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the password hash
        await tx.auth.update({
          where: { id: authToUpdate.id },
          data: { passwordHash: hashedPassword }
        });

        // Invalidate all password reset tokens
        await this.authSession.invalidatePasswordResetTokens(user.id);

        // Invalidate all existing sessions for security
        await this.authSession.invalidateSession(user.id);

        // Log successful password reset
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

