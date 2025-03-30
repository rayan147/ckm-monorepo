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
exports.VendorService = void 0;
const db_1 = require("@ckm/db");
const common_1 = require("@nestjs/common");
const logging_service_1 = require("../logging/logging.service");
const prisma_service_1 = require("../prisma/prisma.service");
let VendorService = class VendorService {
    constructor(prisma, logger) {
        this.prisma = prisma;
        this.logger = logger;
        this.logger.setContext('VendorService');
    }
    async createVendor(data) {
        this.logger.log(`Creating new vendor: ${data.name}`);
        try {
            return await this.prisma.vendor.create({
                data,
                include: { orders: true },
            });
        }
        catch (error) {
            this.logger.handleError(error, 'Failed to create vendor');
        }
    }
    async getVendors(params) {
        const { skip, take, name } = params;
        this.logger.log(`Fetching vendors with params: ${JSON.stringify(params)}`);
        try {
            return await this.prisma.vendor.findMany({
                where: name
                    ? { name: { contains: name, mode: 'insensitive' } }
                    : undefined,
                skip,
                take,
                include: {
                    orders: true,
                },
            });
        }
        catch (error) {
            this.logger.handleError(error, 'Failed to fetch vendors');
        }
    }
    async getVendor(id) {
        this.logger.log(`Fetching vendor with ID ${id}`);
        try {
            const vendor = await this.prisma.vendor.findUnique({
                where: { id },
                include: { orders: true },
            });
            if (!vendor) {
                this.logger.handleError(new Error('Vendor not found'), `Vendor with ID ${id} not found`);
            }
            return vendor;
        }
        catch (error) {
            this.logger.handleError(error, `Failed to fetch vendor with ID ${id}`);
        }
    }
    async updateVendor(id, data) {
        this.logger.log(`Updating vendor with ID ${id}`);
        try {
            return await this.prisma.vendor.update({
                where: { id },
                data,
                include: {
                    orders: true,
                },
            });
        }
        catch (error) {
            if (error instanceof db_1.Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2025') {
                this.logger.handleError(error, `Vendor with ID ${id} not found for update`);
            }
            this.logger.handleError(error, `Failed to update vendor with ID ${id}`);
        }
    }
    async deleteVendor(id) {
        this.logger.log(`Deleting vendor with ID ${id}`);
        try {
            return await this.prisma.vendor.delete({
                where: { id },
                include: { orders: true },
            });
        }
        catch (error) {
            if (error instanceof db_1.Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2025') {
                this.logger.handleError(error, `Vendor with ID ${id} not found for deletion`);
            }
            this.logger.handleError(error, `Failed to delete vendor with ID ${id}`);
        }
    }
    async updateIngredientPrice(ingredientId, vendorId, newPrice) {
        this.logger.log(`Updating price for ingredient ${ingredientId} from vendor ${vendorId}`);
        try {
            const ingredient = await this.prisma.ingredient.update({
                where: { id: ingredientId },
                data: { price: newPrice },
            });
            this.logger.log(`Price updated successfully for ingredient ${ingredientId}`);
            return ingredient;
        }
        catch (error) {
            this.logger.handleError(error, `Failed to update price for ingredient ${ingredientId}`);
        }
    }
    async getVendorIngredients(vendorId) {
        this.logger.log(`Fetching ingredients for vendor ${vendorId}`);
        try {
            const vendor = await this.prisma.vendor.findUnique({
                where: { id: vendorId },
                include: { ingredients: true },
            });
            if (!vendor) {
                this.logger.handleError(new Error('Vendor not found'), `Vendor with ID ${vendorId} not found`);
            }
            return vendor.ingredients;
        }
        catch (error) {
            this.logger.handleError(error, `Failed to fetch ingredients for vendor ${vendorId}`);
        }
    }
};
exports.VendorService = VendorService;
exports.VendorService = VendorService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        logging_service_1.LoggingService])
], VendorService);
//# sourceMappingURL=vendor.service.js.map