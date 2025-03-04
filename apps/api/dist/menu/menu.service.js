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
exports.MenuService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const logging_service_1 = require("../logging/logging.service");
let MenuService = class MenuService {
    constructor(prisma, logger) {
        this.prisma = prisma;
        this.logger = logger;
        this.logger.setContext('MenuService');
    }
    async createMenu(data) {
        try {
            return await this.prisma.menu.create({ data });
        }
        catch (error) {
            this.logger.handleError(error, 'Failed to create menu');
        }
    }
    async getMenus(params) {
        const { skip, take, restaurantId } = params;
        try {
            return await this.prisma.menu.findMany({
                where: { restaurantId },
                skip,
                take,
                include: { menuItems: true },
            });
        }
        catch (error) {
            this.logger.handleError(error, 'Failed to fetch menus');
        }
    }
    async getMenu(id) {
        try {
            const menu = await this.prisma.menu.findUnique({
                where: { id },
                include: { menuItems: true },
            });
            if (!menu) {
                throw new Error('Menu not found');
            }
            return menu;
        }
        catch (error) {
            this.logger.handleError(error, `Failed to fetch menu with ID ${id}`);
        }
    }
    async updateMenu(id, data) {
        try {
            return await this.prisma.menu.update({
                where: { id },
                data,
                include: { menuItems: true },
            });
        }
        catch (error) {
            this.logger.handleError(error, `Failed to update menu with ID ${id}`);
        }
    }
    async deleteMenu(id) {
        try {
            return await this.prisma.menu.delete({
                where: { id },
                include: { menuItems: true },
            });
        }
        catch (error) {
            this.logger.handleError(error, `Failed to delete menu with ID ${id}`);
        }
    }
};
exports.MenuService = MenuService;
exports.MenuService = MenuService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        logging_service_1.LoggingService])
], MenuService);
//# sourceMappingURL=menu.service.js.map