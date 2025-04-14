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
exports.MenuController = void 0;
const common_1 = require("@nestjs/common");
const nest_1 = require("@ts-rest/nest");
const contracts_1 = require("@ckm/contracts");
const menu_service_1 = require("./menu.service");
const db_1 = require("@ckm/db");
const auth_decorator_1 = require("../decorators/auth.decorator");
const logging_service_1 = require("../logging/logging.service");
let MenuController = class MenuController {
    constructor(menuService, logger) {
        this.menuService = menuService;
        this.logger = logger;
        this.logger.setContext('MenuController');
    }
    async createMenu() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.menu.createMenu, async ({ body }) => {
            this.logger.log('Received request to create menu');
            const menu = await this.menuService.createMenu(body);
            return { status: 201, body: menu };
        });
    }
    async getMenus() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.menu.getMenus, async ({ query }) => {
            this.logger.log('Received request to get menus');
            const menus = await this.menuService.getMenus({
                skip: query.skip,
                take: query.take,
                restaurantId: query.restaurantId,
            });
            return { status: 200, body: menus };
        });
    }
    async getMenu() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.menu.getMenu, async ({ params }) => {
            this.logger.log(`Received request to get menu with ID ${params.id}`);
            const menu = await this.menuService.getMenu(params.id);
            return { status: 200, body: menu };
        });
    }
    async updateMenu() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.menu.updateMenu, async ({ params, body }) => {
            this.logger.log(`Received request to update menu with ID ${params.id}`);
            const menu = await this.menuService.updateMenu(params.id, body);
            return { status: 200, body: menu };
        });
    }
    async deleteMenu() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.menu.deleteMenu, async ({ params }) => {
            this.logger.log(`Received request to delete menu with ID ${params.id}`);
            const menu = await this.menuService.deleteMenu(params.id);
            return { status: 200, body: { message: 'Menu deleted successfully' } };
        });
    }
};
exports.MenuController = MenuController;
__decorate([
    (0, auth_decorator_1.Auth)(db_1.UserRole.ADMIN, db_1.UserRole.MANAGER),
    (0, nest_1.TsRestHandler)(contracts_1.contract.menu.createMenu),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "createMenu", null);
__decorate([
    (0, auth_decorator_1.Auth)(db_1.UserRole.ADMIN, db_1.UserRole.MANAGER, db_1.UserRole.CHEF, db_1.UserRole.STAFF),
    (0, nest_1.TsRestHandler)(contracts_1.contract.menu.getMenus),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "getMenus", null);
__decorate([
    (0, auth_decorator_1.Auth)(db_1.UserRole.ADMIN, db_1.UserRole.MANAGER, db_1.UserRole.CHEF, db_1.UserRole.STAFF),
    (0, nest_1.TsRestHandler)(contracts_1.contract.menu.getMenu),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "getMenu", null);
__decorate([
    (0, auth_decorator_1.Auth)(db_1.UserRole.ADMIN, db_1.UserRole.MANAGER),
    (0, nest_1.TsRestHandler)(contracts_1.contract.menu.updateMenu),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "updateMenu", null);
__decorate([
    (0, auth_decorator_1.Auth)(db_1.UserRole.ADMIN, db_1.UserRole.MANAGER),
    (0, nest_1.TsRestHandler)(contracts_1.contract.menu.deleteMenu),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "deleteMenu", null);
exports.MenuController = MenuController = __decorate([
    (0, nest_1.TsRest)({ jsonQuery: true }),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [menu_service_1.MenuService,
        logging_service_1.LoggingService])
], MenuController);
//# sourceMappingURL=menu.controller.js.map