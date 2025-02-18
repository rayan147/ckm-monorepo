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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CsrfController = void 0;
const common_1 = require("@nestjs/common");
const csrf_config_1 = require("./csrf.config");
const env_service_1 = require("../env/env.service");
let CsrfController = class CsrfController {
    constructor(envService) {
        this.csrfUtilities = (0, csrf_config_1.createCsrfUtilities)(envService);
    }
    getCsrfToken(req, res) {
        try {
            const csrfToken = this.csrfUtilities.generateToken(req, res);
            console.log('Generated CSRF Token:', csrfToken);
            console.log('Set-Cookie Header:', res.getHeaders()['set-cookie']);
            if (csrfToken) {
                res.json({
                    csrfToken,
                    status: 200,
                });
            }
        }
        catch (error) {
            res.status(400).json({ message: 'Failed to generate CSRF token' });
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