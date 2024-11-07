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
exports.CookBookController = void 0;
const common_1 = require("@nestjs/common");
const nest_1 = require("@ts-rest/nest");
const contracts_1 = require("@ckm/contracts");
const cookbook_service_1 = require("./cookbook.service");
const logging_service_1 = require("../logging/logging.service");
let CookBookController = class CookBookController {
    constructor(cookbookService, logger) {
        this.cookbookService = cookbookService;
        this.logger = logger;
        this.logger.setContext('CookBookController');
    }
    async createCookBook() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.cookbook.createCookBook, async ({ body }) => {
            this.logger.log('Received request to create cookbook');
            const cookbook = await this.cookbookService.createCookBook(body);
            return { status: 201, body: cookbook };
        });
    }
    async getCookBooks() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.cookbook.getCookBooks, async ({ query }) => {
            this.logger.log('Received request to get cookbooks');
            const cookbooks = await this.cookbookService.getCookBooks({
                skip: query.skip,
                take: query.take,
                restaurantId: query.restaurantId,
            });
            return { status: 200, body: cookbooks };
        });
    }
    async getCookBook() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.cookbook.getCookBook, async ({ params }) => {
            this.logger.log(`Received request to get cookbook with ID ${params.id}`);
            const cookbook = await this.cookbookService.getCookBook(params.id);
            return { status: 200, body: cookbook };
        });
    }
    async updateCookBook() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.cookbook.updateCookBook, async ({ params, body }) => {
            this.logger.log(`Received request to update cookbook with ID ${params.id}`);
            const cookbook = await this.cookbookService.updateCookBook(params.id, body);
            return { status: 200, body: cookbook };
        });
    }
    async deleteCookBook() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.cookbook.deleteCookBook, async ({ params }) => {
            this.logger.log(`Received request to delete cookbook with ID ${params.id}`);
            const cookbook = await this.cookbookService.deleteCookBook(params.id);
            return {
                status: 200,
                body: { message: 'Cookbook deleted successfully' },
            };
        });
    }
};
exports.CookBookController = CookBookController;
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.cookbook.createCookBook),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CookBookController.prototype, "createCookBook", null);
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.cookbook.getCookBooks),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CookBookController.prototype, "getCookBooks", null);
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.cookbook.getCookBook),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CookBookController.prototype, "getCookBook", null);
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.cookbook.updateCookBook),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CookBookController.prototype, "updateCookBook", null);
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.cookbook.deleteCookBook),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CookBookController.prototype, "deleteCookBook", null);
exports.CookBookController = CookBookController = __decorate([
    (0, nest_1.TsRest)({ jsonQuery: true }),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [cookbook_service_1.CookBookService,
        logging_service_1.LoggingService])
], CookBookController);
//# sourceMappingURL=cookbook.controller.js.map