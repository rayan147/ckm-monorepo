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
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const auth_sessions_service_1 = require("./utils/auth.sessions.service");
let AuthGuard = class AuthGuard {
    constructor(reflector, authSession) {
        this.reflector = reflector;
        this.authSession = authSession;
    }
    async canActivate(context) {
        const isPublic = this.reflector.getAllAndOverride('isPublic', [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        console.log('Request URL:', request.url);
        console.log('Request Method:', request.method);
        console.log('Request Headers:', request.headers);
        console.log('Request Cookies:', request.cookies);
        const token = request.cookies['session_token'];
        if (!token) {
            return false;
        }
        const { session, user } = await this.authSession.validateSessionToken(token);
        if (!session || !user) {
            return false;
        }
        request.user = user;
        request.session = session;
        return true;
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        auth_sessions_service_1.AuthSessionsService])
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map