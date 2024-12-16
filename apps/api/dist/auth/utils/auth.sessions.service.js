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
let AuthSessionsService = class AuthSessionsService {
    constructor(prisma, logger) {
        this.prisma = prisma;
        this.logger = logger;
        this.SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;
    }
    async generateVerifactionCode() {
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
    async createSession(token, userId) {
        try {
            const { sha256 } = await import("@oslojs/crypto/sha2");
            const { encodeHexLowerCase } = await import("@oslojs/encoding");
            const generatedVerifactionCode = await this.generateVerifactionCode();
            const generatedSessionToken = await this.generateSessionToken();
            const id = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
            const session = this.prisma.session.create({
                data: {
                    id,
                    code: generatedVerifactionCode,
                    token: generatedSessionToken,
                    expiresAt: new Date(Date.now() + this.SEVEN_DAYS),
                    userId
                }
            });
            return session;
        }
        catch (error) {
            this.logger.handleError(error, `${error.message}`);
        }
    }
    async validateSessionToken(token) {
        const { sha256 } = await import("@oslojs/crypto/sha2");
        const { encodeHexLowerCase } = await import("@oslojs/encoding");
        const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
        const session = await this.prisma.session.findUnique({
            where: { id: sessionId }
        });
        if (session === null) {
            return { session: null, user: null };
        }
        const user = await this.prisma.user.findUnique({
            where: { id: session.userId }
        });
        if (user === null) {
            return { session: null, user: null };
        }
        if (Date.now() >= session.expiresAt.getTime()) {
            await this.prisma.session.delete({
                where: { id: sessionId }
            });
        }
        if (Date.now() >= session.expiresAt.getTime() - this.SEVEN_DAYS) {
            const expiresAt = new Date(Date.now() + this.SEVEN_DAYS);
            await this.prisma.session.update({
                where: { id: sessionId },
                data: {
                    expiresAt: expiresAt
                }
            });
        }
        return { session, user };
    }
};
exports.AuthSessionsService = AuthSessionsService;
exports.AuthSessionsService = AuthSessionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        logging_service_1.LoggingService])
], AuthSessionsService);
//# sourceMappingURL=auth.sessions.service.js.map