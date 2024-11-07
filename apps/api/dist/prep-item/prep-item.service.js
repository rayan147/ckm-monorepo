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
exports.PrepItemService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const logging_service_1 = require("../logging/logging.service");
let PrepItemService = class PrepItemService {
    constructor(prisma, logger) {
        this.prisma = prisma;
        this.logger = logger;
        this.logger.setContext('PrepItemService');
    }
    async createPrepItem(data) {
        try {
            return await this.prisma.prepItem.create({
                data,
                include: { prepBoard: true, recipe: true, assignedTo: true },
            });
        }
        catch (error) {
            this.logger.handleError(error, 'Failed to create prep item');
        }
    }
    async getPrepItems(params) {
        const { skip, take, where, orderBy } = params;
        try {
            return await this.prisma.prepItem.findMany({
                skip,
                take,
                where,
                orderBy,
                include: { prepBoard: true, recipe: true, assignedTo: true },
            });
        }
        catch (error) {
            this.logger.handleError(error, 'Failed to fetch prep items');
        }
    }
    async getPrepItem(id) {
        try {
            const prepItem = await this.prisma.prepItem.findUnique({
                where: { id },
                include: { prepBoard: true, recipe: true, assignedTo: true },
            });
            if (!prepItem) {
                throw new Error('PrepItem not found');
            }
            return prepItem;
        }
        catch (error) {
            this.logger.handleError(error, `Failed to fetch prep item with ID ${id}`);
        }
    }
    async updatePrepItem(id, data) {
        try {
            return await this.prisma.prepItem.update({
                where: { id },
                data,
                include: { prepBoard: true, recipe: true, assignedTo: true },
            });
        }
        catch (error) {
            this.logger.handleError(error, `Failed to update prep item with ID ${id}`);
        }
    }
    async deletePrepItem(id) {
        try {
            return await this.prisma.prepItem.delete({
                where: { id },
                include: { prepBoard: true, recipe: true, assignedTo: true },
            });
        }
        catch (error) {
            this.logger.handleError(error, `Failed to delete prep item with ID ${id}`);
        }
    }
};
exports.PrepItemService = PrepItemService;
exports.PrepItemService = PrepItemService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        logging_service_1.LoggingService])
], PrepItemService);
//# sourceMappingURL=prep-item.service.js.map