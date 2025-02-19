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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcryptjs"));
const uuid_1 = require("uuid");
const prisma_service_1 = require("../prisma/prisma.service");
const users_service_1 = require("../users/users.service");
const auth_sessions_service_1 = require("./utils/auth.sessions.service");
const pinpoint_service_1 = require("../helpers/aws/pinpoint.service");
let AuthService = class AuthService {
    constructor(authSession, userService, prisma, jwtService, pinpointService) {
        this.authSession = authSession;
        this.userService = userService;
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.pinpointService = pinpointService;
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
    async validateUser(email, password) {
        const user = await this.userService.getUserByEmail(email);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const isValid = await bcrypt.compare(password, user.passwordHash);
        if (!isValid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const { passwordHash } = user, rest = __rest(user, ["passwordHash"]);
        return rest;
    }
    async login(email, password) {
        const user = await this.validateUser(email, password);
        const verificationCode = await this.authSession.generateVerifactionCode();
        const token = await this.authSession.generateSessionToken();
        const htmlBody = this.verificationCodeTemplate.replace(/{{verificationCode}}/g, verificationCode);
        const session = await this.authSession.createSession(token, user.id);
        await this.pinpointService.sendEmail(user.email, 'Verification Code Request', htmlBody);
        return {
            code: session.code,
            message: 'Password reset email sent',
        };
    }
    async verifyLoginCode(code) {
        const session = await this.prisma.session.findUnique({
            where: { code },
            include: { user: true },
        });
        if (!session) {
            throw new common_1.UnauthorizedException('Session not found');
        }
        const payload = {
            email: session.user.email,
            sub: session.user.id,
            type: 'verify_user',
        };
        const accessToken = this.jwtService.sign(payload);
        const updatedSession = await this.prisma.session.update({
            where: { code },
            data: { token: accessToken },
            include: { user: true },
        });
        const _a = updatedSession.user, { passwordHash } = _a, restUser = __rest(_a, ["passwordHash"]);
        return { accessToken: updatedSession.token, user: restUser };
    }
    async resendCode(email) {
        const user = await this.userService.getUserByEmail(email);
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        const verificationCode = await this.authSession.generateVerifactionCode();
        const access_uuid = (0, uuid_1.v4)();
        const htmlBody = this.verificationCodeTemplate.replace(/{{verificationCode}}/g, verificationCode);
        const session = await this.prisma.session.create({
            data: {
                userId: user.id,
                code: verificationCode,
                token: access_uuid,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            },
        });
        await this.pinpointService.sendEmail(user.email, 'Verification Code Request', htmlBody);
        return {
            code: session.code,
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
            const user = await this.userService.getUser(userId);
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            await this.validateUser(user.email, oldPassword);
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            const updatedUser = await this.userService.updateUser(userId, {
                passwordHash: hashedPassword,
            });
            return updatedUser;
        }
        catch (error) {
            console.error('Error in changePassword:', error);
            throw error;
        }
    }
    async logout(userId, sessionToken) {
        await this.userService.deleteSession(userId, sessionToken);
    }
    async hasRole(userId, requiredRole) {
        const user = await this.userService.getUser(userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user.role === requiredRole;
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
        const payload = {
            email: user.email,
            sub: user.id,
            type: 'password_reset',
        };
        const resetToken = this.jwtService.sign(payload, { expiresIn: '1h' });
        const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;
        const htmlBody = this.passwordResetTemplate.replace(/{{resetLink}}/g, resetLink);
        await this.prisma.passwordReset.create({
            data: {
                userId: user.id,
                token: resetToken,
                expiresAt: new Date(Date.now() + 60 * 60 * 1000),
            },
        });
        await this.pinpointService.sendEmail(user.email, 'Password Reset Request', htmlBody, `To reset your password, please visit: ${resetLink}`);
        return { message: 'Password reset email sent' };
    }
    async resetPassword(resetToken, newPassword) {
        const reset = await this.prisma.passwordReset.findUnique({
            where: { token: resetToken },
            include: { user: true },
        });
        if (!reset) {
            throw new common_1.UnauthorizedException('Invalid reset token');
        }
        if (reset.expiresAt < new Date()) {
            throw new common_1.UnauthorizedException('Expired reset token');
        }
        try {
            const payload = this.jwtService.verify(resetToken);
            if (payload.type !== 'password_reset' || payload.sub !== reset.user.id) {
                throw new common_1.UnauthorizedException('Invalid token type or user mismatch');
            }
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid JWT token');
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await this.userService.updateUser(reset.user.id, {
            passwordHash: hashedPassword,
        });
        await this.prisma.passwordReset.deleteMany({
            where: { userId: reset.user.id },
        });
        return { message: 'Password successfully reset' };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_sessions_service_1.AuthSessionsService,
        users_service_1.UserService,
        prisma_service_1.PrismaService,
        jwt_1.JwtService,
        pinpoint_service_1.PinpointService])
], AuthService);
//# sourceMappingURL=auth.service.js.map