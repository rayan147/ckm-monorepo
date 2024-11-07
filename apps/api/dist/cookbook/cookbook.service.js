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
exports.CookBookService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const logging_service_1 = require("../logging/logging.service");
let CookBookService = class CookBookService {
    constructor(prisma, logger) {
        this.prisma = prisma;
        this.logger = logger;
        this.logger.setContext('CookBookService');
    }
    async createCookBook(data) {
        try {
            return await this.prisma.cookBook.create({ data });
        }
        catch (error) {
            this.logger.handleError(error, 'Failed to create cookbook');
        }
    }
    async getCookBooks(params) {
        const { skip, take, restaurantId } = params;
        try {
            return await this.prisma.cookBook.findMany({
                where: { restaurantId },
                skip,
                take,
                include: { recipes: true },
            });
        }
        catch (error) {
            this.logger.handleError(error, 'Failed to fetch cookbooks');
        }
    }
    async getCookBook(id) {
        try {
            const cookbook = await this.prisma.cookBook.findUnique({
                where: { id },
                include: { recipes: true },
            });
            if (!cookbook) {
                throw new Error('Cookbook not found');
            }
            return cookbook;
        }
        catch (error) {
            this.logger.handleError(error, `Failed to fetch cookbook with ID ${id}`);
        }
    }
    async updateCookBook(id, data) {
        try {
            return await this.prisma.cookBook.update({
                where: { id },
                data,
                include: { recipes: true },
            });
        }
        catch (error) {
            this.logger.handleError(error, `Failed to update cookbook with ID ${id}`);
        }
    }
    async deleteCookBook(id) {
        try {
            return await this.prisma.cookBook.delete({
                where: { id },
                include: { recipes: true },
            });
        }
        catch (error) {
            this.logger.handleError(error, `Failed to delete cookbook with ID ${id}`);
        }
    }
};
exports.CookBookService = CookBookService;
exports.CookBookService = CookBookService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        logging_service_1.LoggingService])
], CookBookService);
//# sourceMappingURL=cookbook.service.js.map