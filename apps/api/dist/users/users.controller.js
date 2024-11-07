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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const nest_1 = require("@ts-rest/nest");
const users_service_1 = require("./users.service");
const contracts_1 = require("@ckm/contracts");
const function_1 = require("fp-ts/lib/function");
const TE = __importStar(require("fp-ts/TaskEither"));
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async createUser() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.users.createUser, async ({ body }) => {
            return (0, function_1.pipe)(this.userService.createUser(body), TE.matchW((error) => ({
                status: 500,
                body: { message: error.message },
            }), (user) => ({
                status: 200,
                body: user,
            })))();
        });
    }
    async getUsers() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.users.getUsers, async ({ query }) => {
            return (0, function_1.pipe)(this.userService.getUsers({
                skip: query.skip ? parseInt(query.skip) : undefined,
                take: query.take ? parseInt(query.take) : undefined,
                orderBy: query.orderBy,
            }), TE.matchW((error) => ({
                status: 404,
                body: { message: error.message },
            }), (user) => ({
                status: 200,
                body: user,
            })))();
        });
    }
    async getUser() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.users.getUser, async ({ params }) => {
            return (0, function_1.pipe)(this.userService.getUser(params.id), TE.matchW((error) => ({
                status: 404,
                body: { message: error.message },
            }), (user) => ({
                status: 200,
                body: user,
            })))();
        });
    }
    async updateUser() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.users.updateUser, async ({ params, body }) => {
            return (0, function_1.pipe)(this.userService.updateUser(params.id, body), TE.matchW((error) => ({
                status: 404,
                body: { message: error.message },
            }), (user) => ({
                status: 200,
                body: user,
            })))();
        });
    }
    async deleteUser() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.users.deleteUser, async ({ params }) => {
            return (0, function_1.pipe)(this.userService.deleteUser(params.id), TE.matchW((error) => ({
                status: 404,
                body: { message: error.message },
            }), (user) => ({
                status: 200,
                body: user,
            })))();
        });
    }
};
exports.UserController = UserController;
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.users.createUser),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.users.getUsers),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUsers", null);
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.users.getUser),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.users.updateUser),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.users.deleteUser),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
exports.UserController = UserController = __decorate([
    (0, nest_1.TsRest)({ jsonQuery: true }),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [users_service_1.UserService])
], UserController);
//# sourceMappingURL=users.controller.js.map