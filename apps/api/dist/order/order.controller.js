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
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const nest_1 = require("@ts-rest/nest");
const contracts_1 = require("@ckm/contracts");
const order_service_1 = require("./order.service");
let OrderController = class OrderController {
    constructor(orderService) {
        this.orderService = orderService;
    }
    async createOrder() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.orders.createOrder, async ({ body }) => {
            const order = await this.orderService.createOrder(body);
            return { status: 201, body: order };
        });
    }
    async getOrders() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.orders.getOrders, async ({ query }) => {
            const orders = await this.orderService.getOrders({
                skip: query.skip,
                take: query.take,
                orderBy: query.orderBy,
                restaurantId: query.restaurantId,
                vendorId: query.vendorId,
                status: query.status,
            });
            return { status: 200, body: orders };
        });
    }
    async getOrder() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.orders.getOrder, async ({ params }) => {
            const order = await this.orderService.getOrder(params.id);
            if (!order) {
                return { status: 404, body: { message: 'Order not found' } };
            }
            return { status: 200, body: order };
        });
    }
    async updateOrder() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.orders.updateOrder, async ({ params, body }) => {
            const order = await this.orderService.updateOrder(params.id, body);
            return { status: 200, body: order };
        });
    }
    async deleteOrder() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.orders.deleteOrder, async ({ params }) => {
            const order = await this.orderService.deleteOrder(params.id);
            return { status: 200, body: order };
        });
    }
};
exports.OrderController = OrderController;
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.orders.createOrder),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "createOrder", null);
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.orders.getOrders),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getOrders", null);
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.orders.getOrder),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getOrder", null);
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.orders.updateOrder),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "updateOrder", null);
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.orders.deleteOrder),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "deleteOrder", null);
exports.OrderController = OrderController = __decorate([
    (0, nest_1.TsRest)({ jsonQuery: true }),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], OrderController);
//# sourceMappingURL=order.controller.js.map