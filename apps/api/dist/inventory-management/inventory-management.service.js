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
exports.InventoryManagementService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const logging_service_1 = require("../logging/logging.service");
let InventoryManagementService = class InventoryManagementService {
    constructor(prisma, logger) {
        this.prisma = prisma;
        this.logger = logger;
        this.logger.setContext('InventoryManagementService');
    }
    async createInventory(restaurantId) {
        this.logger.log(`Creating inventory for restaurant ${restaurantId}`);
        try {
            const inventory = await this.prisma.inventory.create({
                data: { restaurantId },
            });
            this.logger.log(`Inventory created successfully with ID ${inventory.id}`);
            return inventory;
        }
        catch (error) {
            this.logger.handleError(error, `Failed to create inventory for restaurant ${restaurantId}`);
        }
    }
    async addInventoryItem(data) {
        this.logger.log(`Adding inventory item for ingredient ${data.ingredientId}`);
        try {
            const item = await this.prisma.inventoryItem.create({ data });
            this.logger.log(`Inventory item added successfully with ID ${item.id}`);
            return item;
        }
        catch (error) {
            this.logger.handleError(error, 'Failed to add inventory item');
        }
    }
    async updateInventoryItemQuantity(id, quantity, updatedById) {
        this.logger.log(`Updating quantity for inventory item ${id}`);
        try {
            const item = await this.prisma.inventoryItem.update({
                where: { id },
                data: {
                    quantity,
                    lastUpdatedById: updatedById,
                },
            });
            this.logger.log(`Quantity updated successfully for inventory item ${id}`);
            return item;
        }
        catch (error) {
            this.logger.handleError(error, `Failed to update quantity for inventory item ${id}`);
        }
    }
    async getInventoryForRestaurant(restaurantId) {
        this.logger.log(`Fetching inventory for restaurant ${restaurantId}`);
        try {
            const inventory = await this.prisma.inventory.findUnique({
                where: { restaurantId },
                include: { items: true },
            });
            if (!inventory) {
                this.logger.log(`No inventory found for restaurant ${restaurantId}`);
                return [];
            }
            return inventory.items;
        }
        catch (error) {
            this.logger.handleError(error, `Failed to fetch inventory for restaurant ${restaurantId}`);
        }
    }
};
exports.InventoryManagementService = InventoryManagementService;
exports.InventoryManagementService = InventoryManagementService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        logging_service_1.LoggingService])
], InventoryManagementService);
//# sourceMappingURL=inventory-management.service.js.map