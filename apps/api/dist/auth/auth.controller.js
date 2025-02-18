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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const nest_1 = require("@ts-rest/nest");
const contracts_1 = require("@ckm/contracts");
const auth_service_1 = require("./auth.service");
const i18n_service_1 = require("../i18n/i18n.service");
const env_service_1 = require("../env/env.service");
const csrf_config_1 = require("../csrf/csrf.config");
const csrf_guard_1 = require("../csrf/csrf.guard");
let AuthController = class AuthController {
    constructor(authService, i18nService, envService) {
        this.authService = authService;
        this.i18nService = i18nService;
        this.envService = envService;
        this.csrfUtilities = (0, csrf_config_1.createCsrfUtilities)(envService);
    }
    setCsrfToken(req, res) {
        return this.csrfUtilities.generateToken(req, res, true);
    }
    async resendCode() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.auth.resendCode, async ({ body }) => {
            try {
                const result = await this.authService.resendCode(body.email);
                return {
                    status: 200,
                    body: result,
                };
            }
            catch (error) {
                return {
                    status: 401,
                    body: { message: error.message },
                };
            }
        });
    }
    async login(csrfToken) {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.auth.login, async ({ body }) => {
            try {
                const result = await this.authService.login(body.email, body.password);
                return {
                    status: 200,
                    body: Object.assign({}, result),
                };
            }
            catch (error) {
                return {
                    status: 401,
                    body: { message: error.message },
                };
            }
        });
    }
    async verifyLoginCode() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.auth.verifyLoginCode, async ({ body }) => {
            try {
                const result = await this.authService.verifyLoginCode(body.code);
                return {
                    status: 200,
                    body: result,
                };
            }
            catch (error) {
                return {
                    status: 401,
                    body: { message: error.message },
                };
            }
        });
    }
    async register() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.auth.register, async ({ body }) => {
            try {
                const user = await this.authService.register(body);
                const { passwordHash } = user, restUser = __rest(user, ["passwordHash"]);
                return {
                    status: 201,
                    body: restUser,
                };
            }
            catch (error) {
                return {
                    status: 400,
                    body: { message: error.message },
                };
            }
        });
    }
    async changePassword(req, res) {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.auth.changePassword, async ({ body, params }) => {
            try {
                await this.authService.changePassword(params.userId, body.oldPassword, body.newPassword);
                this.setCsrfToken(req, res);
                return {
                    status: 200,
                    body: {
                        message: this.i18nService.translate('AUTH.CHANGE_PASSWORD.SUCCESS'),
                    },
                };
            }
            catch (error) {
                return {
                    status: 400,
                    body: { message: error.message },
                };
            }
        });
    }
    async logout() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.auth.logout, async ({ body }) => {
            try {
                await this.authService.logout(body.userId, body.accessToken);
                return {
                    status: 200,
                    body: {
                        message: this.i18nService.translate('AUTH.LOGOUT.SUCCESS'),
                    },
                };
            }
            catch (error) {
                return {
                    status: 400,
                    body: { message: error.message },
                };
            }
        });
    }
    async forgotPassword() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.auth.forgotPassword, async ({ body }) => {
            try {
                const result = await this.authService.forgotPassword(body.email);
                return {
                    status: 200,
                    body: result,
                };
            }
            catch (error) {
                return {
                    status: 400,
                    body: { message: error.message },
                };
            }
        });
    }
    async resetPassword(req, res) {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.auth.resetPassword, async ({ body }) => {
            try {
                const result = await this.authService.resetPassword(body.resetToken, body.newPassword);
                this.setCsrfToken(req, res);
                return {
                    status: 200,
                    body: result,
                };
            }
            catch (error) {
                return {
                    status: 400,
                    body: { message: error.message },
                };
            }
        });
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.auth.resendCode),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resendCode", null);
__decorate([
    (0, common_1.UseGuards)(csrf_guard_1.CsrfGuard),
    (0, nest_1.TsRestHandler)(contracts_1.contract.auth.login),
    __param(0, (0, common_1.Headers)('x-csrf-token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.auth.verifyLoginCode),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyLoginCode", null);
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.auth.register),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.auth.changePassword),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "changePassword", null);
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.auth.logout),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.auth.forgotPassword),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.auth.resetPassword),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        i18n_service_1.I18nService,
        env_service_1.EnvService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map