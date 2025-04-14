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
exports.UserController = void 0;
const contracts_1 = require("@ckm/contracts");
const db_1 = require("@ckm/db");
const common_1 = require("@nestjs/common");
const nest_1 = require("@ts-rest/nest");
const users_service_1 = require("./users.service");
const auth_decorator_1 = require("../decorators/auth.decorator");
const public_decorator_1 = require("../decorators/public.decorator");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async createUser() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.users.createUser, async ({ body }) => {
            try {
                const user = await this.userService.createUser(body);
                return {
                    status: 200,
                    body: user,
                };
            }
            catch (error) {
                return {
                    status: 500,
                    body: { message: error.message },
                };
            }
        });
    }
    async getUsers() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.users.getUsers, async ({ query }) => {
            const skip = query.skip ? parseInt(query.skip, 10) : undefined;
            const take = query.take ? parseInt(query.take, 10) : undefined;
            const orderBy = query.orderBy;
            try {
                const users = await this.userService.getUsers({ skip, take, orderBy });
                return {
                    status: 200,
                    body: users,
                };
            }
            catch (error) {
                return {
                    status: 500,
                    body: { message: error.message },
                };
            }
        });
    }
    async getUser() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.users.getUser, async ({ params }) => {
            try {
                const user = await this.userService.getUser(params.id);
                if (!user) {
                    return {
                        status: 404,
                        body: { message: 'User not found' },
                    };
                }
                return {
                    status: 200,
                    body: user,
                };
            }
            catch (error) {
                return {
                    status: 500,
                    body: { message: error.message },
                };
            }
        });
    }
    async getAuthUser(req) {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.users.getAuthUser, async ({ params }) => {
            try {
                console.log('getAuthUser session token:', req.cookies['session_token']);
                console.log('getAuthUser request params:', params);
                const user = await this.userService.getAuthUser(params.id);
                if (!user) {
                    return {
                        status: 404,
                        body: { message: 'User not found' },
                    };
                }
                return {
                    status: 200,
                    body: user,
                };
            }
            catch (error) {
                console.error('Error in getAuthUser:', error);
                return {
                    status: 500,
                    body: { message: error.message },
                };
            }
        });
    }
    async updateUser() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.users.updateUser, async ({ params, body }) => {
            try {
                const user = await this.userService.updateUser(params.id, body);
                return {
                    status: 200,
                    body: user,
                };
            }
            catch (error) {
                if (error instanceof common_1.NotFoundException) {
                    return {
                        status: 404,
                        body: { message: error.message },
                    };
                }
                return {
                    status: 500,
                    body: { message: error.message },
                };
            }
        });
    }
    async deleteUser() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.users.deleteUser, async ({ params }) => {
            try {
                const user = await this.userService.deleteUser(params.id);
                return {
                    status: 200,
                    body: user,
                };
            }
            catch (error) {
                if (error instanceof common_1.NotFoundException) {
                    return {
                        status: 404,
                        body: { message: error.message },
                    };
                }
                return {
                    status: 500,
                    body: { message: error.message },
                };
            }
        });
    }
};
exports.UserController = UserController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, nest_1.TsRestHandler)(contracts_1.contract.users.createUser),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, auth_decorator_1.Auth)(db_1.UserRole.ADMIN, db_1.UserRole.MANAGER),
    (0, nest_1.TsRestHandler)(contracts_1.contract.users.getUsers),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUsers", null);
__decorate([
    (0, auth_decorator_1.Auth)(db_1.UserRole.ADMIN, db_1.UserRole.MANAGER),
    (0, nest_1.TsRestHandler)(contracts_1.contract.users.getUser),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    (0, auth_decorator_1.Auth)(),
    (0, nest_1.TsRestHandler)(contracts_1.contract.users.getAuthUser),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAuthUser", null);
__decorate([
    (0, auth_decorator_1.Auth)(db_1.UserRole.ADMIN),
    (0, nest_1.TsRestHandler)(contracts_1.contract.users.updateUser),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, auth_decorator_1.Auth)(db_1.UserRole.ADMIN),
    (0, nest_1.TsRestHandler)(contracts_1.contract.users.deleteUser),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [users_service_1.UserService])
], UserController);
//# sourceMappingURL=users.controller.js.map