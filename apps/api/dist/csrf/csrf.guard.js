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
exports.CsrfGuard = void 0;
const common_1 = require("@nestjs/common");
const csrf_csrf_1 = require("csrf-csrf");
const env_service_1 = require("../env/env.service");
let CsrfGuard = class CsrfGuard {
    constructor(envService) {
        this.envService = envService;
        this.validateRequest = (0, csrf_csrf_1.doubleCsrf)({
            getSecret: () => this.envService.get('CSRF_SECRET'),
            cookieName: '__Host-psifi.x-csrf-token'
        }).validateRequest;
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        console.log('CSRF Guard Executed');
        console.log('CSRF Token from Header:', request.headers['x-csrf-token']);
        console.log('CSRF Cookie:', request.cookies['__Host-psifi.x-csrf-token']);
        try {
            this.validateRequest(request);
            return true;
        }
        catch (error) {
            return false;
        }
    }
};
exports.CsrfGuard = CsrfGuard;
exports.CsrfGuard = CsrfGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [env_service_1.EnvService])
], CsrfGuard);
//# sourceMappingURL=csrf.guard.js.map