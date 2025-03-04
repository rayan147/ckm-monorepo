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
exports.MenuItemController = void 0;
const common_1 = require("@nestjs/common");
const nest_1 = require("@ts-rest/nest");
const contracts_1 = require("@ckm/contracts");
const menu_item_service_1 = require("./menu-item.service");
const logging_service_1 = require("../logging/logging.service");
let MenuItemController = class MenuItemController {
    constructor(menuItemService, logger) {
        this.menuItemService = menuItemService;
        this.logger = logger;
        this.logger.setContext('MenuItemController');
    }
    async createMenuItem() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.menuItem.createMenuItem, async ({ body }) => {
            this.logger.log('Received request to create menu item');
            const menuItem = await this.menuItemService.createMenuItem(body);
            return { status: 201, body: menuItem };
        });
    }
    async getMenuItems() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.menuItem.getMenuItems, async ({ query }) => {
            this.logger.log('Received request to get menu items');
            const menuItems = await this.menuItemService.getMenuItems({
                skip: query.skip,
                take: query.take,
                menuId: query.menuId,
            });
            return { status: 200, body: menuItems };
        });
    }
    async getMenuItem() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.menuItem.getMenuItem, async ({ params }) => {
            this.logger.log(`Received request to get menu item with ID ${params.id}`);
            const menuItem = await this.menuItemService.getMenuItem(params.id);
            return { status: 200, body: menuItem };
        });
    }
    async updateMenuItem() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.menuItem.updateMenuItem, async ({ params, body }) => {
            this.logger.log(`Received request to update menu item with ID ${params.id}`);
            const menuItem = await this.menuItemService.updateMenuItem(params.id, body);
            return { status: 200, body: menuItem };
        });
    }
    async deleteMenuItem() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.menuItem.deleteMenuItem, async ({ params }) => {
            this.logger.log(`Received request to delete menu item with ID ${params.id}`);
            const menuItem = await this.menuItemService.deleteMenuItem(params.id);
            return {
                status: 200,
                body: { message: 'Menu item deleted successfully' },
            };
        });
    }
    async addRecipeToMenuItem() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.menuItem.addRecipeToMenuItem, async ({ body }) => {
            this.logger.log(`Received request to add recipe ${body.recipeId} to menu item ${body.menuItemId}`);
            const recipe = await this.menuItemService.addRecipeToMenuItem(body.menuItemId, body.recipeId);
            return { status: 201, body: recipe };
        });
    }
    async getMenuItemByRecipeId() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.menuItem.getMenuItemByRecipeId, async ({ params }) => {
            this.logger.log(`Received request to get menu item by recipe ID ${params.recipeId}`);
            const menuItem = await this.menuItemService.getMenuItemByRecipeId(params.recipeId);
            return { status: 200, body: menuItem };
        });
    }
    async calculateMenuItemPrice() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.menuItem.calculateMenuItemPrice, async ({ params }) => {
            this.logger.log(`Received request to calculate menu item price for menu item ${params.menuItemId}`);
            const price = await this.menuItemService.calculateMenuItemPrice(params.menuItemId);
            return { status: 200, body: price };
        });
    }
    async calculateMenuItemFoodCostPercentage() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.menuItem.calculateMenuItemFoodCostPercentage, async ({ params }) => {
            this.logger.log(`Received request to calculate menu item food cost percentage for menu item ${params.menuItemId}`);
            const foodCostPercentage = await this.menuItemService.calculateMenuItemFoodCostPercentage(params.menuItemId);
            return { status: 200, body: foodCostPercentage };
        });
    }
    async calculateItemsFoodCostPercentage() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.menuItem.calculateItemsFoodCostPercentage, async ({ query }) => {
            this.logger.log(`Received request to calculate items food cost percentage`);
            const foodCostPercentage = await this.menuItemService.calculateItemsFoodCostPercentage(query.menuItemIds);
            return { status: 200, body: foodCostPercentage };
        });
    }
};
exports.MenuItemController = MenuItemController;
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.menuItem.createMenuItem),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MenuItemController.prototype, "createMenuItem", null);
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.menuItem.getMenuItems),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MenuItemController.prototype, "getMenuItems", null);
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.menuItem.getMenuItem),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MenuItemController.prototype, "getMenuItem", null);
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.menuItem.updateMenuItem),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MenuItemController.prototype, "updateMenuItem", null);
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.menuItem.deleteMenuItem),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MenuItemController.prototype, "deleteMenuItem", null);
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.menuItem.addRecipeToMenuItem),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MenuItemController.prototype, "addRecipeToMenuItem", null);
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.menuItem.getMenuItemByRecipeId),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MenuItemController.prototype, "getMenuItemByRecipeId", null);
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.menuItem.calculateMenuItemPrice),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MenuItemController.prototype, "calculateMenuItemPrice", null);
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.menuItem.calculateMenuItemFoodCostPercentage),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MenuItemController.prototype, "calculateMenuItemFoodCostPercentage", null);
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.menuItem.calculateItemsFoodCostPercentage),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MenuItemController.prototype, "calculateItemsFoodCostPercentage", null);
exports.MenuItemController = MenuItemController = __decorate([
    (0, nest_1.TsRest)({ jsonQuery: true }),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [menu_item_service_1.MenuItemService,
        logging_service_1.LoggingService])
], MenuItemController);
//# sourceMappingURL=menu-item.controller.js.map