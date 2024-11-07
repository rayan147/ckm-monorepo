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
exports.ShiftService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const logging_service_1 = require("../logging/logging.service");
let ShiftService = class ShiftService {
    constructor(prisma, logger) {
        this.prisma = prisma;
        this.logger = logger;
        this.logger.setContext('ShiftService');
    }
    async createShift(data) {
        this.logger.log(`Creating new shift for user ${data.userId}`);
        try {
            const shift = await this.prisma.shift.create({ data });
            this.logger.log(`Shift created successfully with ID ${shift.id}`);
            return shift;
        }
        catch (error) {
            this.logger.handleError(error, 'Failed to create shift');
        }
    }
    async getShifts(params) {
        const { skip, take, userId, status, startTime, endTime } = params;
        this.logger.log(`Fetching shifts with params: ${JSON.stringify(params)}`);
        try {
            const shifts = await this.prisma.shift.findMany({
                where: {
                    userId: userId ? Number(userId) : undefined,
                    status,
                    startTime: startTime ? { gte: new Date(startTime) } : undefined,
                    endTime: endTime ? { lte: new Date(endTime) } : undefined,
                },
                skip: skip ? Number(skip) : undefined,
                take: take ? Number(take) : undefined,
                orderBy: [{ startTime: 'asc' }, { endTime: 'asc' }],
            });
            this.logger.log(`Retrieved ${shifts.length} shifts`);
            return shifts;
        }
        catch (error) {
            this.logger.error(`Failed to fetch shifts: ${error}`);
            throw new Error('Failed to fetch shifts');
        }
    }
    async getShift(id) {
        this.logger.log(`Fetching shift with ID ${id}`);
        try {
            const shift = await this.prisma.shift.findUnique({ where: { id } });
            if (!shift) {
                this.logger.handleError(new Error('Shift not found'), `Shift with ID ${id} not found`);
            }
            return shift;
        }
        catch (error) {
            this.logger.handleError(error, `Failed to fetch shift with ID ${id}`);
        }
    }
    async updateShift(id, data) {
        this.logger.log(`Updating shift with ID ${id}`);
        try {
            const shift = await this.prisma.shift.update({
                where: { id },
                data,
            });
            this.logger.log(`Shift with ID ${id} updated successfully`);
            return shift;
        }
        catch (error) {
            this.logger.handleError(error, `Failed to update shift with ID ${id}`);
        }
    }
    async deleteShift(id) {
        this.logger.log(`Deleting shift with ID ${id}`);
        try {
            const shift = await this.prisma.shift.delete({ where: { id } });
            this.logger.log(`Shift with ID ${id} deleted successfully`);
            return shift;
        }
        catch (error) {
            this.logger.handleError(error, `Failed to delete shift with ID ${id}`);
        }
    }
};
exports.ShiftService = ShiftService;
exports.ShiftService = ShiftService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        logging_service_1.LoggingService])
], ShiftService);
//# sourceMappingURL=shifts.service.js.map