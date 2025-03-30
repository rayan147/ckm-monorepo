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
exports.CsrfMiddleware = void 0;
const common_1 = require("@nestjs/common");
const env_service_1 = require("../env/env.service");
let CsrfMiddleware = class CsrfMiddleware {
    constructor(envService) {
        this.envService = envService;
        this.excludedRoutes = [
            '/csrf',
            '/auth/login',
            '/auth/register'
        ];
        this.excludedMethods = ['GET', 'HEAD', 'OPTIONS'];
        const isDev = envService.get('NODE_ENV') !== 'prod';
        this.cookieName = isDev ? 'psifi.x-csrf-token' : '__Host-psifi.x-csrf-token';
    }
    use(req, res, next) {
        if (this.excludedMethods.includes(req.method)) {
            return next();
        }
        if (this.excludedRoutes.some(route => req.path.startsWith(route))) {
            return next();
        }
        const cookieToken = req.cookies[this.cookieName];
        const headerToken = req.headers['x-csrf-token'];
        if (!cookieToken || !headerToken || cookieToken !== headerToken) {
            return res.status(403).json({ message: 'Invalid CSRF token' });
        }
        next();
    }
};
exports.CsrfMiddleware = CsrfMiddleware;
exports.CsrfMiddleware = CsrfMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [env_service_1.EnvService])
], CsrfMiddleware);
//# sourceMappingURL=csrf.middleware.js.map