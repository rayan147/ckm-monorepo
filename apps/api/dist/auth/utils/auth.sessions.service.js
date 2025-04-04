"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthSessionsService = void 0;
const common_1 = require("@nestjs/common");
const logging_service_1 = require("../../logging/logging.service");
const prisma_service_1 = require("../../prisma/prisma.service");
const env_service_1 = require("../../env/env.service");
const csrf_service_1 = require("../../csrf/csrf.service");
let AuthSessionsService = class AuthSessionsService {
    constructor(prisma, logger, envService, csrfService) {
        this.prisma = prisma;
        this.logger = logger;
        this.envService = envService;
        this.csrfService = csrfService;
        this.THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;
        this.FIFTEEN_DAYS = 15 * 24 * 60 * 60 * 1000;
        this.ONE_HOUR = 60 * 60 * 1000;
    }
    setSessionCookie(response, token, request, expiresIn = this.THIRTY_DAYS) {
        const isDev = this.envService.get('NODE_ENV') === "dev";
        console.log('Setting cookie with token:', token, 'Dev mode:', isDev);
        response.cookie('session_token', token, {
            httpOnly: true,
            secure: !isDev,
            sameSite: 'strict',
            maxAge: expiresIn,
            path: '/'
        });
        console.log('Cookie headers after setting:', response.getHeaders());
        return this.csrfService.setCsrfToken(request, response);
    }
    clearSessionCookie(response) {
        const isDev = this.envService.get('NODE_ENV') === "dev";
        response.clearCookie('session_token', {
            httpOnly: true,
            secure: !isDev,
            sameSite: 'strict',
            path: '/'
        });
    }
    async generatedVerifictionCode() {
        const { generateRandomString } = await import("@oslojs/crypto/random");
        const random = {
            read(bytes) {
                crypto.getRandomValues(bytes);
            }
        };
        return generateRandomString(random, '0123456789', 6);
    }
    async generateSessionToken() {
        const { encodeBase32LowerCaseNoPadding } = await import("@oslojs/encoding");
        const bytes = new Uint8Array(32);
        crypto.getRandomValues(bytes);
        const token = encodeBase32LowerCaseNoPadding(bytes);
        return token;
    }
    async getFullSession(sessionId) {
        try {
            const session = await this.prisma.session.findUnique({
                where: { id: sessionId },
                include: {
                    user: true,
                },
            });
            if (session === null) {
                return { session: null, user: null };
            }
            if (Date.now() >= session.expiresAt.getTime()) {
                await this.invalidateSession(session.user.id);
                return { session: null, user: null };
            }
            return {
                session,
                user: session.user
            };
        }
        catch (error) {
            this.logger.handleError(error, 'Error in getFullSession');
        }
    }
    async createSession(token, userId, verified = false) {
        try {
            const { sha256 } = await import("@oslojs/crypto/sha2");
            const { encodeHexLowerCase } = await import("@oslojs/encoding");
            const existingSessions = await this.prisma.session.findMany({
                where: { userId },
                orderBy: { createdAt: 'desc' },
            });
            const MAX_SESSIONS = 5;
            if (existingSessions.length >= MAX_SESSIONS) {
                const sessionsToDelete = existingSessions.slice(MAX_SESSIONS - 1);
                if (sessionsToDelete.length > 0) {
                    await this.prisma.session.deleteMany({
                        where: {
                            id: {
                                in: sessionsToDelete.map(s => s.id)
                            }
                        }
                    });
                }
            }
            const generatedVerifactionCode = await this.generatedVerifictionCode();
            const generatedSessionToken = await this.generateSessionToken();
            const id = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
            const session = await this.prisma.session.create({
                data: {
                    id,
                    verificationCode: generatedVerifactionCode,
                    token: generatedSessionToken,
                    expiresAt: new Date(Date.now() + this.THIRTY_DAYS),
                    userId,
                    verified
                }
            });
            return session;
        }
        catch (error) {
            this.logger.handleError(error, `Error creating session: ${error.message}`);
        }
    }
    async extendedSession(sessionId) {
        try {
            const session = await this.prisma.session.findUniqueOrThrow({
                where: { id: sessionId }
            });
            if (Date.now() >= session.expiresAt.getTime()) {
                throw new common_1.UnauthorizedException('Cannot extend expired session');
            }
            if (Date.now() >= session.expiresAt.getTime() - this.FIFTEEN_DAYS) {
                const newExpiresAt = new Date(Date.now() + this.THIRTY_DAYS);
                const updatedSession = await this.prisma.session.update({
                    where: { id: sessionId },
                    data: {
                        expiresAt: newExpiresAt
                    }
                });
                return updatedSession;
            }
            return session;
        }
        catch (error) {
            this.logger.handleError(error, 'Error extending the session');
        }
    }
    async validateSessionToken(token) {
        try {
            const { sha256 } = await import("@oslojs/crypto/sha2");
            const { encodeHexLowerCase } = await import("@oslojs/encoding");
            const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
            const session = await this.prisma.session.findUnique({
                where: { id: sessionId },
                include: {
                    user: true
                }
            });
            const sessionIsValid = !!session && Date.now() < session.expiresAt.getTime();
            if (!sessionIsValid) {
                if (session && Date.now() >= session.expiresAt.getTime()) {
                    await this.invalidateSession(session.user.id);
                }
                return { session: null, user: null };
            }
            await this.extendedSession(session.id);
            return { session, user: session.user };
        }
        catch (error) {
            this.logger.handleError(error, 'Error validating session token');
        }
    }
    async invalidateSession(userId) {
        try {
            const user = await this.prisma.user.findUniqueOrThrow({
                where: { id: userId },
                include: {
                    sessions: true
                }
            });
            await Promise.all(user.sessions.map(async ({ id }) => {
                await this.prisma.session.delete({ where: { id } });
            }));
            this.logger.log(`Successfully invalidated all sessions for user ${userId}`);
        }
        catch (error) {
            this.logger.error('Error invalidating sessions', error);
            throw error;
        }
    }
    async invalidateAllUserSessions(userId) {
        await this.prisma.session.deleteMany({ where: { userId } });
    }
    async verifySession(verificationCode) {
        try {
            await new Promise(resolve => setTimeout(resolve, 100));
            const session = await this.prisma.session.findUnique({
                where: { verificationCode },
                include: { user: true }
            });
            if (!session) {
                throw new common_1.UnauthorizedException('Invalid verification code');
            }
            if (Date.now() >= session.expiresAt.getTime()) {
                throw new common_1.UnauthorizedException('Verification code has expired');
            }
            await this.prisma.session.update({
                where: { id: session.id },
                data: {
                    verified: true,
                    verificationCode: await this.generatedVerifictionCode()
                }
            });
            const newToken = await this.generateSessionToken();
            await this.invalidateSession(session.userId);
            await this.createSession(newToken, session.userId, true);
            return { sessionToken: newToken, user: session.user };
        }
        catch (error) {
            this.logger.handleError(error, 'Failed to verify session');
        }
    }
    async createPasswordResetToken(userId) {
        try {
            await this.invalidatePasswordResetTokens(userId);
            const resetToken = await this.generateSessionToken();
            await this.prisma.passwordReset.create({
                data: {
                    userId,
                    token: resetToken,
                    expiresAt: new Date(Date.now() + this.ONE_HOUR),
                }
            });
            return resetToken;
        }
        catch (error) {
            this.logger.handleError(error, 'Error creating password reset token');
        }
    }
    async createPassowrdResetToken(userId) {
        return this.createPasswordResetToken(userId);
    }
    async validatePasswordResetToken(token) {
        try {
            await new Promise(resolve => setTimeout(resolve, 150));
            const reset = await this.prisma.passwordReset.findUnique({
                where: { token },
                include: { user: true },
            });
            const isValid = !!reset && reset.expiresAt > new Date();
            if (!isValid) {
                if (reset && reset.expiresAt < new Date()) {
                    await this.invalidatePasswordResetTokens(reset.userId);
                }
                return { isValid: false };
            }
            return { isValid: true, user: reset.user };
        }
        catch (error) {
            this.logger.handleError(error, 'Error validating password reset token');
        }
    }
    async invalidatePasswordResetTokens(userId) {
        try {
            await this.prisma.passwordReset.deleteMany({
                where: { userId },
            });
            this.logger.log(`Invalidated all password reset tokens for user ${userId}`);
        }
        catch (error) {
            this.logger.handleError(error, 'Error invalidating password reset tokens');
        }
    }
};
exports.AuthSessionsService = AuthSessionsService;
exports.AuthSessionsService = AuthSessionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        logging_service_1.LoggingService,
        env_service_1.EnvService,
        csrf_service_1.CsrfService])
], AuthSessionsService);
//# sourceMappingURL=auth.sessions.service.js.map