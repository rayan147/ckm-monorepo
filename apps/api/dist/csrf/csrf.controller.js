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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CsrfController = void 0;
const common_1 = require("@nestjs/common");
const env_service_1 = require("../env/env.service");
const csrf_config_1 = require("./csrf.config");
const crypto = __importStar(require("crypto"));
let CsrfController = class CsrfController {
    constructor(envService) {
        this.envService = envService;
        const isDev = envService.get('NODE_ENV') !== 'prod';
        this.cookieName = isDev ? 'psifi.x-csrf-token' : '__Host-psifi.x-csrf-token';
        this.csrfUtils = (0, csrf_config_1.createCsrfUtilities)(envService);
    }
    getCsrfToken(req, res) {
        try {
            const token = crypto.randomBytes(32).toString('hex');
            res.cookie(this.cookieName, token, {
                httpOnly: false,
                sameSite: 'lax',
                path: '/',
                secure: this.envService.get('NODE_ENV') === 'prod',
            });
            return res.status(200).json({ csrfToken: token, status: 200 });
        }
        catch (error) {
            console.error('Error generating CSRF token:', error);
            return res.status(500).json({ message: 'Failed to generate CSRF token', status: 500 });
        }
    }
};
exports.CsrfController = CsrfController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], CsrfController.prototype, "getCsrfToken", null);
exports.CsrfController = CsrfController = __decorate([
    (0, common_1.Controller)('csrf'),
    __metadata("design:paramtypes", [env_service_1.EnvService])
], CsrfController);
//# sourceMappingURL=csrf.controller.js.map