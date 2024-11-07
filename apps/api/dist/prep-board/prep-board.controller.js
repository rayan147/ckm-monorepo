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
exports.PrepBoardController = void 0;
const common_1 = require("@nestjs/common");
const nest_1 = require("@ts-rest/nest");
const contracts_1 = require("@ckm/contracts");
const prep_board_service_1 = require("./prep-board.service");
const logging_service_1 = require("../logging/logging.service");
let PrepBoardController = class PrepBoardController {
    constructor(prepBoardService, logger) {
        this.prepBoardService = prepBoardService;
        this.logger = logger;
        this.logger.setContext('PrepBoardController');
    }
    async createPrepBoard() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.prepBoard.createPrepBoard, async ({ body }) => {
            this.logger.log('Received request to create prep board');
            const prepBoard = await this.prepBoardService.createPrepBoard(body);
            return { status: 201, body: prepBoard };
        });
    }
    async getPrepBoards() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.prepBoard.getPrepBoards, async ({ query }) => {
            this.logger.log('Received request to get prep boards');
            const prepBoards = await this.prepBoardService.getPrepBoards({
                skip: query.skip,
                take: query.take,
                where: query.where,
                orderBy: query.orderBy,
            });
            return { status: 200, body: prepBoards };
        });
    }
    async getPrepBoard() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.prepBoard.getPrepBoard, async ({ params }) => {
            this.logger.log(`Received request to get prep board with ID ${params.id}`);
            const prepBoard = await this.prepBoardService.getPrepBoard(params.id);
            return { status: 200, body: prepBoard };
        });
    }
    async updatePrepBoard() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.prepBoard.updatePrepBoard, async ({ params, body }) => {
            this.logger.log(`Received request to update prep board with ID ${params.id}`);
            const prepBoard = await this.prepBoardService.updatePrepBoard(params.id, body);
            return { status: 200, body: prepBoard };
        });
    }
    async deletePrepBoard() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.prepBoard.deletePrepBoard, async ({ params }) => {
            this.logger.log(`Received request to delete prep board with ID ${params.id}`);
            const prepBoard = await this.prepBoardService.deletePrepBoard(params.id);
            return {
                status: 200,
                body: { message: 'PrepBoard deleted successfully' },
            };
        });
    }
};
exports.PrepBoardController = PrepBoardController;
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.prepBoard.createPrepBoard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PrepBoardController.prototype, "createPrepBoard", null);
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.prepBoard.getPrepBoards),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PrepBoardController.prototype, "getPrepBoards", null);
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.prepBoard.getPrepBoard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PrepBoardController.prototype, "getPrepBoard", null);
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.prepBoard.updatePrepBoard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PrepBoardController.prototype, "updatePrepBoard", null);
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.prepBoard.deletePrepBoard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PrepBoardController.prototype, "deletePrepBoard", null);
exports.PrepBoardController = PrepBoardController = __decorate([
    (0, nest_1.TsRest)({ jsonQuery: true }),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [prep_board_service_1.PrepBoardService,
        logging_service_1.LoggingService])
], PrepBoardController);
//# sourceMappingURL=prep-board.controller.js.map