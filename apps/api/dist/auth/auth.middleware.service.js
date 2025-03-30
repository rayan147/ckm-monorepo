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
exports.AuthMiddleware = void 0;
const common_1 = require("@nestjs/common");
const auth_sessions_service_1 = require("./utils/auth.sessions.service");
let AuthMiddleware = class AuthMiddleware {
    constructor(authSession) {
        this.authSession = authSession;
        this.publicPaths = [
            '/csft',
            'auth/login',
            'auth/register',
            'auth/verify-login',
            'auth/forgot-password'
        ];
    }
    async use(req, res, next) {
        const isPublicPath = this.publicPaths.some(path => req.path.startsWith(path));
        console.log({ req });
        if (isPublicPath) {
            return next();
        }
        const token = req.cookies['session_token'];
        if (token) {
            const { session, user } = await this.authSession.validateSessionToken(token);
            if (session && user) {
                req.user = user;
                req.session = session;
            }
        }
        next();
    }
};
exports.AuthMiddleware = AuthMiddleware;
exports.AuthMiddleware = AuthMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_sessions_service_1.AuthSessionsService])
], AuthMiddleware);
//# sourceMappingURL=auth.middleware.service.js.map