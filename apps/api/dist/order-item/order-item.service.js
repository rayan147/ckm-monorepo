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
exports.OrderItemService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const db_1 = require("@ckm/db");
let OrderItemService = class OrderItemService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createOrderItem(data) {
        try {
            return await this.prisma.orderItem.create({ data });
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to create order item');
        }
    }
    async getOrderItems(params) {
        const { skip, take, orderId } = params;
        try {
            return await this.prisma.orderItem.findMany({
                where: { orderId },
                skip,
                take,
            });
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to fetch order items');
        }
    }
    async getOrderItem(id) {
        try {
            const orderItem = await this.prisma.orderItem.findUnique({
                where: { id },
            });
            if (!orderItem)
                throw new common_1.NotFoundException('Order item not found');
            return orderItem;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException)
                throw error;
            throw new common_1.BadRequestException('Failed to fetch order item');
        }
    }
    async updateOrderItem(id, data) {
        try {
            return await this.prisma.orderItem.update({
                where: { id },
                data,
            });
        }
        catch (error) {
            if (error instanceof db_1.Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2025') {
                throw new common_1.NotFoundException('Order item not found');
            }
            throw new common_1.BadRequestException('Failed to update order item');
        }
    }
    async deleteOrderItem(id) {
        try {
            return await this.prisma.orderItem.delete({ where: { id } });
        }
        catch (error) {
            if (error instanceof db_1.Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2025') {
                throw new common_1.NotFoundException('Order item not found');
            }
            throw new common_1.BadRequestException('Failed to delete order item');
        }
    }
};
exports.OrderItemService = OrderItemService;
exports.OrderItemService = OrderItemService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrderItemService);
//# sourceMappingURL=order-item.service.js.map