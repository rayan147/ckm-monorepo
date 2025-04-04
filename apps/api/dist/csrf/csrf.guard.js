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
const core_1 = require("@nestjs/core");
let CsrfGuard = class CsrfGuard {
    constructor(relector) {
        this.relector = relector;
    }
    canActivate(context) {
        const req = context.switchToHttp().getRequest();
        if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
            return true;
        }
        try {
            const hasValidToken = this.validateCsrfToken(req);
            if (!hasValidToken) {
                throw new common_1.UnauthorizedException('Invalid CSRF token');
            }
            return true;
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid CSRF token');
        }
    }
    validateCsrfToken(req) {
        var _a, _b;
        const token = req.headers['x-csrf-token'] || ((_a = req.body) === null || _a === void 0 ? void 0 : _a.csrfToken);
        const storedToken = (_b = req.session) === null || _b === void 0 ? void 0 : _b.csrfToken;
        return !!token && !!storedToken && token === storedToken;
    }
};
exports.CsrfGuard = CsrfGuard;
exports.CsrfGuard = CsrfGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], CsrfGuard);
//# sourceMappingURL=csrf.guard.js.map