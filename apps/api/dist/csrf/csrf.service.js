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
exports.CsrfService = void 0;
const common_1 = require("@nestjs/common");
const csrf_sync_1 = require("csrf-sync");
const env_service_1 = require("../env/env.service");
let CsrfService = class CsrfService {
    constructor(envService) {
        this.envService = envService;
        const { csrfSynchronisedProtection, generateToken, revokeToken } = (0, csrf_sync_1.csrfSync)({
            ignoredMethods: ['GET', 'HEAD', 'OPTIONS'],
            getTokenFromState: req => {
                var _a;
                return (_a = req.session) === null || _a === void 0 ? void 0 : _a.csrfToken;
            },
            getTokenFromRequest: req => {
                var _a;
                return req.headers['x-csrf-token'] || ((_a = req.body) === null || _a === void 0 ? void 0 : _a.csrfToken);
            },
            storeTokenInState: (req, token) => {
                if (req.session) {
                    req.session.csrfToken = token;
                }
            },
            size: 128,
        });
        this.csrfProtection = csrfSynchronisedProtection;
        this.generateToken = generateToken;
        this.revokeToken = revokeToken;
    }
    protect() {
        return this.csrfProtection;
    }
    generateCsrfToken(req, forceNew = false) {
        return this.generateToken(req, forceNew);
    }
    revokeCsrfToken(req) {
        this.revokeToken(req);
    }
    setCsrfToken(req, res) {
        const token = this.generateCsrfToken(req);
        res.setHeader('X-CSRF-Token', token);
        return token;
    }
};
exports.CsrfService = CsrfService;
exports.CsrfService = CsrfService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [env_service_1.EnvService])
], CsrfService);
//# sourceMappingURL=csrf.service.js.map