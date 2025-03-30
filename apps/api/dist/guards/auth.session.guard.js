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
exports.SessionAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const auth_sessions_service_1 = require("../auth/utils/auth.sessions.service");
const logging_service_1 = require("../logging/logging.service");
let SessionAuthGuard = class SessionAuthGuard {
    constructor(sessionService, logger) {
        this.sessionService = sessionService;
        this.logger = logger;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const sessionToken = request.cookies['session_token'];
        if (!sessionToken) {
            this.logger.debug('Auth failed: No session token provided');
            throw new common_1.UnauthorizedException('No session token provided');
        }
        try {
            const { session, user } = await this.sessionService.validateSessionToken(sessionToken);
            if (!session || !user) {
                this.logger.debug('Auth failed: Invalid session or user');
                throw new common_1.UnauthorizedException('Authentication required');
            }
            if (!session.verified) {
                this.logger.debug(`Auth failed: Unverified session for user ${user.id}`);
                throw new common_1.UnauthorizedException('Authentication required');
            }
            request.user = user;
            return true;
        }
        catch (error) {
            this.logger.handleError(error, 'Session authentication failed');
        }
    }
};
exports.SessionAuthGuard = SessionAuthGuard;
exports.SessionAuthGuard = SessionAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_sessions_service_1.AuthSessionsService, logging_service_1.LoggingService])
], SessionAuthGuard);
//# sourceMappingURL=auth.session.guard.js.map