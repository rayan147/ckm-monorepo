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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
const function_1 = require("fp-ts/function");
const TE = __importStar(require("fp-ts/TaskEither"));
let AuthController = class AuthController {
    constructor(authService, i18nService) {
        this.authService = authService;
        this.i18nService = i18nService;
    }
    async resendCode() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.auth.resendCode, async ({ body }) => {
            return (0, function_1.pipe)(this.authService.resendCode(body.email), TE.matchW((error) => ({
                status: 401,
                body: { message: error.message },
            }), (result) => ({
                status: 200,
                body: result,
            })))();
        });
    }
    async login() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.auth.login, async ({ body }) => {
            return (0, function_1.pipe)(this.authService.login(body.email, body.password), TE.matchW((error) => ({
                status: 401,
                body: { message: error.message },
            }), (result) => ({
                status: 200,
                body: result,
            })))();
        });
    }
    async verifyLoginCode() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.auth.verifyLoginCode, async ({ body }) => {
            return (0, function_1.pipe)(this.authService.verifyLoginCode(body.code), TE.matchW((error) => ({
                status: 401,
                body: { message: error.message },
            }), (result) => ({
                status: 200,
                body: result,
            })))();
        });
    }
    async register() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.auth.register, async ({ body }) => {
            return (0, function_1.pipe)(this.authService.register(body), TE.matchW((error) => ({
                status: 400,
                body: { message: error.message },
            }), (user) => {
                const { passwordHash } = user, result = __rest(user, ["passwordHash"]);
                return { status: 201, body: result };
            }))();
        });
    }
    async changePassword() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.auth.changePassword, async ({ body, params }) => {
            return (0, function_1.pipe)(this.authService.changePassword(params.userId, body.oldPassword, body.newPassword), TE.matchW((error) => ({
                status: 400,
                body: { message: error.message },
            }), () => ({
                status: 200,
                body: {
                    message: this.i18nService.translate('AUTH.CHANGE_PASSWORD.SUCCESS'),
                },
            })))();
        });
    }
    async logout() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.auth.logout, async ({ body }) => {
            return (0, function_1.pipe)(this.authService.logout(body.userId, body.accessToken), TE.matchW((error) => ({
                status: 400,
                body: {
                    message: error.message,
                },
            }), () => ({
                status: 200,
                body: {
                    message: this.i18nService.translate('AUTH.LOGOUT.SUCCESS'),
                },
            })))();
        });
    }
    async forgotPassword() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.auth.forgotPassword, async ({ body }) => {
            return (0, function_1.pipe)(this.authService.forgotPassword(body.email), TE.matchW((error) => ({
                status: 400,
                body: { message: error.message },
            }), (result) => ({
                status: 200,
                body: result,
            })))();
        });
    }
    async resetPassword() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.auth.resetPassword, async ({ body }) => {
            return (0, function_1.pipe)(this.authService.resetPassword(body.resetToken, body.newPassword), TE.matchW((error) => ({
                status: 400,
                body: { message: error.message },
            }), (result) => ({
                status: 200,
                body: result,
            })))();
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
    (0, nest_1.TsRestHandler)(contracts_1.contract.auth.login),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
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
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
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
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        i18n_service_1.I18nService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map