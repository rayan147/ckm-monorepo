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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const prisma_service_1 = require("../prisma/prisma.service");
const db_1 = require("@ckm/db");
const pinpoint_service_1 = require("../pinpoint/pinpoint.service");
const bcrypt = __importStar(require("bcrypt"));
const function_1 = require("fp-ts/function");
const TE = __importStar(require("fp-ts/TaskEither"));
const E = __importStar(require("fp-ts/Either"));
const IO = __importStar(require("fp-ts/IO"));
const T = __importStar(require("fp-ts/lib/Task"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const uuid_1 = require("uuid");
const env_service_1 = require("../env/env.service");
let AuthService = class AuthService {
    constructor(userService, prisma, jwtService, pinpointService, envService) {
        this.userService = userService;
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.pinpointService = pinpointService;
        this.envService = envService;
        this.generateVerificationCode = IO.of(() => Math.floor(100000 + Math.random() * 900000).toString())();
        this.validateUser = (email, password) => {
            const performValidatePassword = (user) => (0, function_1.pipe)(TE.tryCatch(() => bcrypt.compare(password, user.passwordHash), E.toError), TE.chainW(TE.fromPredicate((isValid) => isValid, () => new common_1.InternalServerErrorException('Invalid credentials'))), TE.map(() => user));
            return (0, function_1.pipe)(this.userService.getUserByEmail(email), TE.chainW((user) => performValidatePassword(user)), TE.map((user) => user));
        };
        this.login = (email, password) => {
            const performLoginProcess = (user) => {
                const verificationCode = this.generateVerificationCode();
                const access_uuid = (0, uuid_1.v4)();
                const htmlBody = this.codeTemplate.replace(/{{verificationCode}}/g, verificationCode);
                return (0, function_1.pipe)(TE.tryCatch(() => this.prisma.session.create({
                    data: {
                        userId: user.id,
                        code: verificationCode,
                        token: access_uuid,
                        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                    },
                }), E.toError), TE.chainFirst(() => TE.tryCatch(() => this.pinpointService.sendEmail(user.email, 'Verification Code Request', htmlBody), E.toError)), TE.map((user) => user));
            };
            return (0, function_1.pipe)(this.validateUser(email, password), TE.flatMap((user) => performLoginProcess(user)), TE.map((session) => ({
                code: session.code,
                message: 'Password reset email sent',
            })));
        };
        this.verifyLoginCode = (code) => {
            const findUserByCode = (code) => {
                return TE.tryCatch(() => this.prisma.session.findUnique({
                    where: { code: code },
                    include: { user: true },
                }), E.toError);
            };
            const performVerifyingProcess = (session) => {
                const payload = {
                    email: session.user.email,
                    sub: session.user.id,
                    type: 'verify_user',
                };
                console.log({ payload });
                const accessToken = this.jwtService.sign(payload);
                return TE.tryCatch(() => this.prisma.session.update({
                    where: {
                        code: code,
                    },
                    data: {
                        token: accessToken,
                    },
                    include: { user: true },
                }), E.toError);
            };
            return (0, function_1.pipe)(findUserByCode(code), TE.chainW(TE.fromNullable(new common_1.UnauthorizedException('Session not found'))), TE.chainW((session) => performVerifyingProcess(session)), TE.map((session) => ({
                accessToken: session.token,
                user: Object.assign(Object.assign({}, session.user), { passwordHash: undefined }),
            })));
        };
        this.resendCode = (email) => {
            const performLoginProcess = (user) => {
                const verificationCode = this.generateVerificationCode();
                const access_uuid = (0, uuid_1.v4)();
                const htmlBody = this.codeTemplate.replace(/{{verificationCode}}/g, verificationCode);
                return (0, function_1.pipe)(TE.tryCatch(() => this.prisma.session.create({
                    data: {
                        userId: user.id,
                        code: verificationCode,
                        token: access_uuid,
                        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                    },
                }), E.toError), TE.chainFirst(() => TE.tryCatch(() => this.pinpointService.sendEmail(user.email, 'Verification Code Request', htmlBody), E.toError)), TE.map((user) => user));
            };
            return (0, function_1.pipe)(this.userService.getUserByEmail(email), TE.flatMap((user) => performLoginProcess(user)), TE.map((session) => ({
                code: session.code,
                message: 'Code has been sent',
            })));
        };
        this.register = (data) => {
            const userExist = (email) => (0, function_1.pipe)(this.userService.getUserByEmail(email), TE.match(() => false, () => true));
            return (0, function_1.pipe)(userExist(data.email), T.flatMap((exists) => exists
                ? TE.left(new Error('User exists'))
                : this.userService.createUser(data)));
        };
        this.changePassword = (userId, oldPassword, newPassword) => (0, function_1.pipe)(this.userService.getUser(userId), TE.flatMap((user) => (0, function_1.pipe)(this.validateUser(user.email, oldPassword), TE.tryCatchK(() => bcrypt.hash(newPassword, 10), E.toError))), TE.flatMap((hashedPassword) => this.userService.updateUser(userId, { passwordHash: hashedPassword })), TE.mapLeft((error) => {
            console.error('Error in changePassword:', error);
            return error;
        }));
        this.logout = (userId, sessionToken) => this.userService.deleteSession(userId, sessionToken);
        this.hasRole = (userId, requiredRole) => (0, function_1.pipe)(this.userService.getUser(userId), TE.map((user) => user.role === requiredRole));
        this.changeUserRole = (adminUserId, targetUserId, newRole) => (0, function_1.pipe)(this.hasRole(adminUserId, db_1.UserRole.ADMIN), TE.chainW(TE.fromPredicate((isAdmin) => isAdmin, () => new common_1.InternalServerErrorException('Only admins can change user roles'))), TE.flatMap(() => this.userService.updateUserRole(targetUserId, newRole)));
        this.forgotPassword = (email) => {
            const performTokenRest = (user) => {
                const payload = {
                    email: user.email,
                    sub: user.id,
                    type: 'password_reset',
                };
                const resetToken = this.jwtService.sign(payload, { expiresIn: '1h' });
                const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;
                const htmlBody = this.emailTemplate.replace(/{{resetLink}}/g, resetLink);
                return (0, function_1.pipe)(TE.tryCatch(() => this.prisma.passwordReset.create({
                    data: {
                        userId: user.id,
                        token: resetToken,
                        expiresAt: new Date(Date.now() + 60 * 60 * 1000),
                    },
                }), E.toError), TE.chainFirst(() => TE.tryCatch(() => this.pinpointService.sendEmail(user.email, 'Password Reset Request', htmlBody, `To reset your password, please visit: ${resetLink}`), E.toError)), TE.map(() => ({ message: 'Password reset email sent' })));
            };
            return (0, function_1.pipe)(this.userService.getUserByEmail(email), TE.chainW((user) => performTokenRest(user)));
        };
        this.resetPassword = (resetToken, newPassword) => (0, function_1.pipe)(TE.tryCatch(() => this.prisma.passwordReset.findUnique({
            where: { token: resetToken },
            include: { user: true },
        }), () => new common_1.UnauthorizedException('Failed to fetch reset token')), TE.chain(TE.fromNullable(new common_1.UnauthorizedException('Invalid reset token'))), TE.chain((reset) => reset.expiresAt > new Date()
            ? TE.right(reset)
            : TE.left(new common_1.UnauthorizedException('Expired reset token'))), TE.chain((reset) => (0, function_1.pipe)(TE.tryCatch(() => Promise.resolve(this.jwtService.verify(resetToken)), () => new common_1.UnauthorizedException('Invalid JWT token')), TE.chain((payload) => payload.type === 'password_reset' && payload.sub === reset.user.id
            ? TE.right(reset.user)
            : TE.left(new common_1.UnauthorizedException('Invalid token type or user mismatch'))))), TE.chain((user) => (0, function_1.pipe)(TE.tryCatch(() => bcrypt.hash(newPassword, 10), () => new common_1.UnauthorizedException('Failed to hash password')), TE.chain((hashedPassword) => this.userService.updateUser(user.id, {
            passwordHash: hashedPassword,
        })))), TE.flatMap((user) => TE.tryCatch(() => this.prisma.passwordReset.deleteMany({
            where: { userId: user.id },
        }), () => new common_1.UnauthorizedException('Failed to delete password reset tokens'))), TE.map(() => ({ message: 'Password successfully reset' })));
        this.emailTemplate = fs_1.default.readFileSync(path_1.default.join(process.cwd(), './src/auth/templates/password-reset-email.html'), 'utf8');
        this.codeTemplate = fs_1.default.readFileSync(path_1.default.join(process.cwd(), './src/auth/templates/verification-code-email.html'), 'utf8');
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UserService,
        prisma_service_1.PrismaService,
        jwt_1.JwtService,
        pinpoint_service_1.PinpointService,
        env_service_1.EnvService])
], AuthService);
//# sourceMappingURL=auth.service.js.map