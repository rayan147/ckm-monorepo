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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const nest_1 = require("@ts-rest/nest");
const contracts_1 = require("@ckm/contracts");
const auth_service_1 = require("./auth.service");
const i18n_service_1 = require("../i18n/i18n.service");
const env_service_1 = require("../env/env.service");
const auth_sessions_service_1 = require("./utils/auth.sessions.service");
const public_decorator_1 = require("../decorators/public.decorator");
let AuthController = class AuthController {
    constructor(authService, i18nService, envService, authSession) {
        this.authService = authService;
        this.i18nService = i18nService;
        this.envService = envService;
        this.authSession = authSession;
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
    async login() {
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
    async verifyLoginCode(req, res) {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.auth.verifyLoginCode, async ({ body }) => {
            var _a;
            try {
                const result = await this.authService.verifyLoginCode(body.verificationCode);
                this.authSession.setSessionCookie(res, result.sessionToken, req);
                return {
                    status: 200,
                    body: Object.assign(Object.assign({}, result), { csrfToken: (_a = req === null || req === void 0 ? void 0 : req.session) === null || _a === void 0 ? void 0 : _a.csrfToken }),
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
                return {
                    status: 201,
                    body: user
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
    async logout(request, response) {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.auth.logout, async ({ body }) => {
            try {
                await this.authService.logout(body.userId);
                const token = request.cookies['session_token'];
                if (token) {
                    const { user } = await this.authSession.validateSessionToken(token);
                    if (user) {
                        await this.authSession.invalidateSession(user.id);
                    }
                }
                this.authSession.clearSessionCookie(response);
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
    (0, public_decorator_1.Public)(),
    (0, nest_1.TsRestHandler)(contracts_1.contract.auth.resendCode),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resendCode", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, nest_1.TsRestHandler)(contracts_1.contract.auth.login),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, nest_1.TsRestHandler)(contracts_1.contract.auth.verifyLoginCode),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyLoginCode", null);
__decorate([
    (0, public_decorator_1.Public)(),
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
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
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
        env_service_1.EnvService,
        auth_sessions_service_1.AuthSessionsService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map