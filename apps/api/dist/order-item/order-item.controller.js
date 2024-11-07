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
exports.OrderItemController = void 0;
const common_1 = require("@nestjs/common");
const nest_1 = require("@ts-rest/nest");
const contracts_1 = require("@ckm/contracts");
const order_item_service_1 = require("./order-item.service");
let OrderItemController = class OrderItemController {
    constructor(orderItemService) {
        this.orderItemService = orderItemService;
    }
    async createOrderItem() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.orderItem.createOrderItem, async ({ body }) => {
            const orderItem = await this.orderItemService.createOrderItem(body);
            return { status: 201, body: orderItem };
        });
    }
    async getOrderItems() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.orderItem.getOrderItems, async ({ query }) => {
            const orderItems = await this.orderItemService.getOrderItems({
                skip: query.skip ? parseInt(query.skip) : undefined,
                take: query.take ? parseInt(query.take) : undefined,
                orderId: query.orderId ? parseInt(query.orderId) : undefined,
            });
            return { status: 200, body: orderItems };
        });
    }
    async getOrderItem() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.orderItem.getOrderItem, async ({ params }) => {
            const orderItem = await this.orderItemService.getOrderItem(params.id);
            return { status: 200, body: orderItem };
        });
    }
    async updateOrderItem() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.orderItem.updateOrderItem, async ({ params, body }) => {
            const orderItem = await this.orderItemService.updateOrderItem(params.id, body);
            return { status: 200, body: orderItem };
        });
    }
    async deleteOrderItem() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.orderItem.deleteOrderItem, async ({ params }) => {
            const orderItem = await this.orderItemService.deleteOrderItem(params.id);
            return { status: 200, body: orderItem };
        });
    }
};
exports.OrderItemController = OrderItemController;
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.orderItem.createOrderItem),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderItemController.prototype, "createOrderItem", null);
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.orderItem.getOrderItems),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderItemController.prototype, "getOrderItems", null);
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.orderItem.getOrderItem),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderItemController.prototype, "getOrderItem", null);
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.orderItem.updateOrderItem),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderItemController.prototype, "updateOrderItem", null);
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.orderItem.deleteOrderItem),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderItemController.prototype, "deleteOrderItem", null);
exports.OrderItemController = OrderItemController = __decorate([
    (0, nest_1.TsRest)({ jsonQuery: true }),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [order_item_service_1.OrderItemService])
], OrderItemController);
//# sourceMappingURL=order-item.controller.js.map