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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const db_1 = require("@ckm/db");
let OrderService = class OrderService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createOrder(data) {
        try {
            const order = await this.prisma.order.create({ data });
            if (!order)
                throw new common_1.BadRequestException('Could not create a new order');
            return order;
        }
        catch (error) {
            if (error instanceof db_1.Prisma.PrismaClientKnownRequestError) {
                throw new common_1.BadRequestException('Could not create the order', error.message);
            }
            throw new common_1.InternalServerErrorException('An error occurred while creating the order');
        }
    }
    async getOrders(params) {
        const { skip, take, orderBy, restaurantId, vendorId, status } = params;
        try {
            const orders = await this.prisma.order.findMany({
                skip,
                take,
                orderBy: orderBy ? { [orderBy]: 'asc' } : undefined,
                where: {
                    restaurantId,
                    vendorId,
                    status,
                },
                include: {
                    restaurant: true,
                    vendor: true,
                    items: true,
                },
            });
            return orders;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('An error occurred while fetching orders');
        }
    }
    async getOrder(id) {
        try {
            return await this.prisma.order.findUnique({
                where: { id },
                include: {
                    restaurant: true,
                    vendor: true,
                    items: true,
                },
            });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('An error occurred while fetching the order');
        }
    }
    async updateOrder(id, data) {
        try {
            const updatedOrder = await this.prisma.order.update({
                where: { id },
                data: data,
                include: {
                    restaurant: true,
                    vendor: true,
                    items: true,
                },
            });
            return updatedOrder;
        }
        catch (error) {
            if (error instanceof db_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new common_1.BadRequestException('Order not found');
                }
                throw new common_1.BadRequestException('Could not update the order', error.message);
            }
            throw new common_1.InternalServerErrorException('An error occurred while updating the order');
        }
    }
    async deleteOrder(id) {
        try {
            return await this.prisma.order.delete({
                where: { id },
                include: {
                    restaurant: true,
                    vendor: true,
                    items: true,
                },
            });
        }
        catch (error) {
            if (error instanceof db_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new common_1.BadRequestException('Order not found');
                }
                throw new common_1.BadRequestException('Could not delete the order', error.message);
            }
            throw new common_1.InternalServerErrorException('An error occurred while deleting the order');
        }
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrderService);
//# sourceMappingURL=order.service.js.map