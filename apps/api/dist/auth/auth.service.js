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
        const user = await this.userService.getAuthgUserByEmail(email);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const sortedAuth = this.sortRolesByPriorityOrder(user);
        for (const authRecord of sortedAuth) {
            const isValid = await bcrypt.compare(password, authRecord.passwordHash);
            if (isValid) {
                return user;
            }
        }
        return null;
    }
    async login(email, password) {
        const user = await this.validateUser(email, password);
        const verificationCode = await this.authSession.generatedVerifictionCode();
        const token = await this.authSession.generateSessionToken();
        const htmlBody = this.emailTemplateService.getVerificationCodeTemplate(verificationCode);
        if (!user) {
            throw new common_1.BadRequestException('fail to validate user');
        }
        await this.authSession.createSession(token, user.id, false);
        await this.pinpointService.sendEmail(user.email, 'Verification Code Request', htmlBody);
        return {
            success: true,
        };
    }
    async verifyLoginCode(verficationCode) {
        return this.authSession.verifySession(verficationCode);
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
            throw new Error('User exists');
        }
        return this.userService.createUser(data);
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
        return this.userService.updateUserRole(targetUserId, newRole);
    }
    async forgotPassword(email) {
        const user = await this.userService.getUserByEmail(email);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const resetToken = this.authSession.createPassowrdResetToken(user.id);
        const env = this.envService.get('NODE_ENV');
        const base_url = env === "prod" ? this.envService.get('BASE_URL') : this.envService.get('BASE_URL_DEV');
        const port = this.envService.get('PORT');
        const resetLink = `${base_url}:${port}/reset-password?token=${resetToken}`;
        const htmlBody = this.emailTemplateService.getPasswordResetTemplate(resetLink);
        await this.pinpointService.sendEmail(user.email, 'Password Reset Request', htmlBody, `To reset your password, please visit: ${resetLink}`);
        return { message: 'Password reset email sent' };
    }
    async resetPassword(resetToken, newPassword) {
        const { isValid, user } = await this.authSession.validatePasswordResetToken(resetToken);
        if (!isValid || !user) {
            throw new common_1.UnauthorizedException('Invalid or expired reset token');
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