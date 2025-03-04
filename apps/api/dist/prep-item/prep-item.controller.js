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
exports.PrepItemController = void 0;
const common_1 = require("@nestjs/common");
const nest_1 = require("@ts-rest/nest");
const contracts_1 = require("@ckm/contracts");
const prep_item_service_1 = require("./prep-item.service");
const logging_service_1 = require("../logging/logging.service");
let PrepItemController = class PrepItemController {
    constructor(prepItemService, logger) {
        this.prepItemService = prepItemService;
        this.logger = logger;
        this.logger.setContext('PrepItemController');
    }
    async createPrepItem() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.prepItem.createPrepItem, async ({ body }) => {
            this.logger.log('Received request to create prep item');
            const prepItem = await this.prepItemService.createPrepItem(body);
            return { status: 201, body: prepItem };
        });
    }
    async getPrepItems() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.prepItem.getPrepItems, async ({ query }) => {
            this.logger.log('Received request to get prep items');
            const prepItems = await this.prepItemService.getPrepItems({
                skip: query.skip,
                take: query.take,
                where: query.where,
                orderBy: query.orderBy,
            });
            return { status: 200, body: prepItems };
        });
    }
    async getPrepItem() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.prepItem.getPrepItem, async ({ params }) => {
            this.logger.log(`Received request to get prep item with ID ${params.id}`);
            const prepItem = await this.prepItemService.getPrepItem(params.id);
            return { status: 200, body: prepItem };
        });
    }
    async updatePrepItem() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.prepItem.updatePrepItem, async ({ params, body }) => {
            this.logger.log(`Received request to update prep item with ID ${params.id}`);
            const prepItem = await this.prepItemService.updatePrepItem(params.id, body);
            return { status: 200, body: prepItem };
        });
    }
    async deletePrepItem() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.prepItem.deletePrepItem, async ({ params }) => {
            this.logger.log(`Received request to delete prep item with ID ${params.id}`);
            const prepItem = await this.prepItemService.deletePrepItem(params.id);
            return {
                status: 200,
                body: { message: 'PrepItem deleted successfully' },
            };
        });
    }
};
exports.PrepItemController = PrepItemController;
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.prepItem.createPrepItem),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PrepItemController.prototype, "createPrepItem", null);
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.prepItem.getPrepItems),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PrepItemController.prototype, "getPrepItems", null);
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.prepItem.getPrepItem),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PrepItemController.prototype, "getPrepItem", null);
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.prepItem.updatePrepItem),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PrepItemController.prototype, "updatePrepItem", null);
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.prepItem.deletePrepItem),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PrepItemController.prototype, "deletePrepItem", null);
exports.PrepItemController = PrepItemController = __decorate([
    (0, nest_1.TsRest)({ jsonQuery: true }),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [prep_item_service_1.PrepItemService,
        logging_service_1.LoggingService])
], PrepItemController);
//# sourceMappingURL=prep-item.controller.js.map