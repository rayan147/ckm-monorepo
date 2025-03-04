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
exports.PrepBoardService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const logging_service_1 = require("../logging/logging.service");
let PrepBoardService = class PrepBoardService {
    constructor(prisma, logger) {
        this.prisma = prisma;
        this.logger = logger;
        this.logger.setContext('PrepBoardService');
    }
    async createPrepBoard(data) {
        try {
            return await this.prisma.prepBoard.create({
                data,
                include: { recipes: true, prepItems: true },
            });
        }
        catch (error) {
            this.logger.handleError(error, 'Failed to create prep board');
        }
    }
    async getPrepBoards(params) {
        const { skip, take, where, orderBy } = params;
        try {
            return await this.prisma.prepBoard.findMany({
                skip,
                take,
                where,
                orderBy,
                include: { recipes: true, prepItems: true },
            });
        }
        catch (error) {
            this.logger.handleError(error, 'Failed to fetch prep boards');
        }
    }
    async getPrepBoard(id) {
        try {
            const prepBoard = await this.prisma.prepBoard.findUnique({
                where: { id },
                include: { recipes: true, prepItems: true },
            });
            if (!prepBoard) {
                throw new Error('PrepBoard not found');
            }
            return prepBoard;
        }
        catch (error) {
            this.logger.handleError(error, `Failed to fetch prep board with ID ${id}`);
        }
    }
    async updatePrepBoard(id, data) {
        try {
            return await this.prisma.prepBoard.update({
                where: { id },
                data,
                include: { recipes: true, prepItems: true },
            });
        }
        catch (error) {
            this.logger.handleError(error, `Failed to update prep board with ID ${id}`);
        }
    }
    async deletePrepBoard(id) {
        try {
            return await this.prisma.prepBoard.delete({
                where: { id },
                include: { recipes: true, prepItems: true },
            });
        }
        catch (error) {
            this.logger.handleError(error, `Failed to delete prep board with ID ${id}`);
        }
    }
};
exports.PrepBoardService = PrepBoardService;
exports.PrepBoardService = PrepBoardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        logging_service_1.LoggingService])
], PrepBoardService);
//# sourceMappingURL=prep-board.service.js.map