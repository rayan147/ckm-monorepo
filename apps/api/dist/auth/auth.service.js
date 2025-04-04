"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const db_1 = require("@ckm/db");
const common_1 = require("@nestjs/common");
const bcrypt = __importStar(require("bcryptjs"));
const prisma_service_1 = require("../prisma/prisma.service");
const users_service_1 = require("../users/users.service");
const auth_sessions_service_1 = require("./utils/auth.sessions.service");
const pinpoint_service_1 = require("../helpers/aws/pinpoint.service");
const logging_service_1 = require("../logging/logging.service");
const env_service_1 = require("../env/env.service");
const email_template_service_1 = require("../templates/email-template.service");
let AuthService = class AuthService {
    constructor(envService, logger, authSession, userService, prisma, pinpointService, emailTemplateService) {
        this.envService = envService;
        this.logger = logger;
        this.authSession = authSession;
        this.userService = userService;
        this.prisma = prisma;
        this.pinpointService = pinpointService;
        this.emailTemplateService = emailTemplateService;
    }
    sortRolesByPriorityOrder(user) {
        const priorityOrder = [db_1.UserRole.ADMIN, db_1.UserRole.MANAGER, db_1.UserRole.CHEF, db_1.UserRole.STAFF];
        const sortedAuth = [...user.auth].sort((a, b) => {
            return priorityOrder.indexOf(a.role) - priorityOrder.indexOf(b.role);
        });
        return sortedAuth;
    }
    async validateUser(email, password) {
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
        }
        catch (error) {
            this.logger.handleError(error, 'Error validating user credentials');
        }
    }
    async login(email, password) {
        try {
            const user = await this.validateUser(email, password);
            if (!user) {
                throw new common_1.UnauthorizedException('Invalid credentials');
            }
            await this.authSession.invalidateSession(user.id);
            const verificationCode = await this.authSession.generatedVerifictionCode();
            const token = await this.authSession.generateSessionToken();
            const htmlBody = this.emailTemplateService.getVerificationCodeTemplate(verificationCode);
            await this.authSession.createSession(token, user.id, false);
            await this.pinpointService.sendEmail(user.email, 'Verification Code Request', htmlBody);
            this.logger.log(`Login initiated for user: ${user.email} (ID: ${user.id})`);
            return {
                success: true,
            };
        }
        catch (error) {
            if (error instanceof common_1.UnauthorizedException) {
                throw error;
            }
            this.logger.handleError(error, 'Login process failed');
        }
    }
    async verifyLoginCode(verificationCode) {
        try {
            await new Promise(resolve => setTimeout(resolve, 100));
            const result = await this.authSession.verifySession(verificationCode);
            this.logger.log(`Successful verification for user ID: ${result.user.id}`);
            return result;
        }
        catch (error) {
            this.logger.handleError(error, 'Verification code validation failed');
        }
    }
    async resendCode(email) {
        const user = await this.userService.getUserByEmail(email);
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        await this.authSession.invalidateSession(user.id);
        const token = await this.authSession.generateSessionToken();
        const verificationCode = await this.authSession.generatedVerifictionCode();
        const htmlBody = this.emailTemplateService.getVerificationCodeTemplate(verificationCode);
        await this.authSession.createSession(token, user.id, false);
        await this.pinpointService.sendEmail(user.email, 'Verification Code Request', htmlBody);
        return {
            message: 'Code has been sent',
        };
    }
    async register(data) {
        const existingUser = await this.userService.getUserByEmail(data.email);
        if (existingUser) {
            throw new common_1.BadRequestException('User already exists');
        }
        const { password, role, isOrganization, organizationInput, restaurantsInput } = data, userData = __rest(data, ["password", "role", "isOrganization", "organizationInput", "restaurantsInput"]);
        return this.userService.createUser(Object.assign(Object.assign({ password,
            role }, userData), { isOrganization,
            organizationInput,
            restaurantsInput }));
    }
    async changePassword(userId, oldPassword, newPassword) {
        try {
            const user = await this.userService.getAuthUser(userId);
            if (!user || !user.auth || user.auth.length === 0) {
                throw new common_1.NotFoundException('User not found or has no auth records');
            }
            await this.validateUser(user.email, oldPassword);
            const hashedNewPassword = await bcrypt.hash(newPassword, 10);
            const sortedAuth = this.sortRolesByPriorityOrder(user);
            const highestPriorityAuth = sortedAuth[0];
            const isSameAsOld = await bcrypt.compare(newPassword, highestPriorityAuth.passwordHash);
            if (isSameAsOld) {
                throw new common_1.BadRequestException('New password cannot be the same as the current password');
            }
            await this.prisma.auth.update({
                where: { id: highestPriorityAuth.id },
                data: { passwordHash: hashedNewPassword }
            });
        }
        catch (error) {
            this.logger.handleError(error, 'Failed to change password');
        }
    }
    async logout(userId) {
        await this.authSession.invalidateSession(userId);
    }
    async hasRole(userId, requiredRole) {
        const user = await this.userService.getAuthUser(userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user.auth.some((auth) => auth.role === requiredRole);
    }
    async changeUserRole(adminUserId, targetUserId, newRole) {
        const isAdmin = await this.hasRole(adminUserId, db_1.UserRole.ADMIN);
        if (!isAdmin) {
            throw new common_1.InternalServerErrorException('Only admins can change user roles');
        }
        const updatedUser = this.userService.updateUserRole(targetUserId, newRole);
        if (!updatedUser) {
            throw new common_1.BadRequestException('User not found');
        }
        return updatedUser;
    }
    async forgotPassword(email) {
        try {
            const startTime = Date.now();
            await new Promise(resolve => setTimeout(resolve, 150));
            const user = await this.userService.getUserByEmail(email);
            if (!user) {
                await new Promise(resolve => setTimeout(resolve, 200));
                this.logger.log(`Password reset requested for non-existent email: ${email}`);
                return { message: 'If your email exists in our system, you will receive password reset instructions.' };
            }
            const resetToken = await this.authSession.createPasswordResetToken(user.id);
            const env = this.envService.get('NODE_ENV');
            const base_url = env === "prod" ? this.envService.get('BASE_URL') : this.envService.get('BASE_URL_DEV');
            const port = this.envService.get('PORT');
            const protocol = env === "prod" ? "https" : "http";
            const host = base_url.replace(/^https?:\/\//, '');
            const resetLink = `${protocol}://${host}${port ? ':' + port : ''}/reset-password?token=${resetToken}`;
            const htmlBody = this.emailTemplateService.getPasswordResetTemplate(resetLink);
            await this.pinpointService.sendEmail(user.email, 'Password Reset Request', htmlBody, `To reset your password, please visit: ${resetLink}`);
            this.logger.log(`Password reset requested for user ID: ${user.id}`);
            const elapsedTime = Date.now() - startTime;
            if (elapsedTime < 500) {
                await new Promise(resolve => setTimeout(resolve, 500 - elapsedTime));
            }
            return { message: 'If your email exists in our system, you will receive password reset instructions.' };
        }
        catch (error) {
            this.logger.handleError(error, 'Password reset request failed');
        }
    }
    async resetPassword(resetToken, newPassword) {
        try {
            await new Promise(resolve => setTimeout(resolve, 200));
            if (!newPassword || newPassword.length < 8) {
                throw new common_1.BadRequestException('Password must be at least 8 characters long');
            }
            const { isValid, user } = await this.authSession.validatePasswordResetToken(resetToken);
            if (!isValid || !user) {
                throw new common_1.UnauthorizedException('Invalid or expired reset token');
            }
            const authUser = await this.userService.getAuthUser(user.id);
            const sortedAuth = this.sortRolesByPriorityOrder(authUser);
            const authToUpdate = sortedAuth[0];
            const isSameAsOld = await bcrypt.compare(newPassword, authToUpdate.passwordHash);
            if (isSameAsOld) {
                throw new common_1.BadRequestException('New password cannot be the same as current password');
            }
            return this.prisma.$transaction(async (tx) => {
                const hashedPassword = await bcrypt.hash(newPassword, 10);
                await tx.auth.update({
                    where: { id: authToUpdate.id },
                    data: { passwordHash: hashedPassword }
                });
                await this.authSession.invalidatePasswordResetTokens(user.id);
                await this.authSession.invalidateSession(user.id);
                this.logger.log(`Password reset completed for user ID: ${user.id}`);
                return { message: 'Password successfully reset' };
            });
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException || error instanceof common_1.UnauthorizedException) {
                throw error;
            }
            this.logger.handleError(error, 'Password reset failed');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [env_service_1.EnvService,
        logging_service_1.LoggingService,
        auth_sessions_service_1.AuthSessionsService,
        users_service_1.UserService,
        prisma_service_1.PrismaService,
        pinpoint_service_1.PinpointService,
        email_template_service_1.EmailTemplateService])
], AuthService);
//# sourceMappingURL=auth.service.js.map