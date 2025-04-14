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
var ShiftController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShiftController = void 0;
const contracts_1 = require("@ckm/contracts");
const db_1 = require("@ckm/db");
const common_1 = require("@nestjs/common");
const nest_1 = require("@ts-rest/nest");
const auth_decorator_1 = require("../decorators/auth.decorator");
const logging_service_1 = require("../logging/logging.service");
const shifts_service_1 = require("./shifts.service");
let ShiftController = ShiftController_1 = class ShiftController {
    constructor(shiftService, logger) {
        this.shiftService = shiftService;
        this.logger = logger;
        this.logger.setContext(ShiftController_1.name);
    }
    async getShifts() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.shifts.getShifts, async ({ query }) => {
            this.logger.log('Received request to get shifts');
            const shifts = await this.shiftService.getShifts({
                skip: query.skip,
                take: query.take,
                userId: query.userId,
                status: query.status,
            });
            return { status: 200, body: shifts };
        });
    }
    async getShift() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.shifts.getShift, async ({ params }) => {
            this.logger.log(`Received request to get shift with ID ${params.id}`);
            const shift = await this.shiftService.getShift(params.id);
            return { status: 200, body: shift };
        });
    }
    async updateShift() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.shifts.updateShift, async ({ params, body }) => {
            this.logger.log(`Received request to update shift with ID ${params.id}`);
            const shift = await this.shiftService.updateShift(params.id, body);
            return { status: 200, body: shift };
        });
    }
    async deleteShift() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.shifts.deleteShift, async ({ params }) => {
            this.logger.log(`Received request to delete shift with ID ${params.id}`);
            const shift = await this.shiftService.deleteShift(params.id);
            return { status: 200, body: shift };
        });
    }
    async createShift() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.shifts.createShift, async ({ body }) => {
            this.logger.log('Received request to create shift');
            const shift = await this.shiftService.createShift(body);
            return { status: 201, body: shift };
        });
    }
};
exports.ShiftController = ShiftController;
__decorate([
    (0, auth_decorator_1.Auth)(db_1.UserRole.ADMIN, db_1.UserRole.MANAGER, db_1.UserRole.CHEF, db_1.UserRole.STAFF),
    (0, nest_1.TsRestHandler)(contracts_1.contract.shifts.getShifts),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ShiftController.prototype, "getShifts", null);
__decorate([
    (0, auth_decorator_1.Auth)(db_1.UserRole.ADMIN, db_1.UserRole.MANAGER, db_1.UserRole.CHEF, db_1.UserRole.STAFF),
    (0, nest_1.TsRestHandler)(contracts_1.contract.shifts.getShift),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ShiftController.prototype, "getShift", null);
__decorate([
    (0, auth_decorator_1.Auth)(db_1.UserRole.ADMIN, db_1.UserRole.MANAGER),
    (0, nest_1.TsRestHandler)(contracts_1.contract.shifts.updateShift),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ShiftController.prototype, "updateShift", null);
__decorate([
    (0, auth_decorator_1.Auth)(db_1.UserRole.ADMIN, db_1.UserRole.MANAGER),
    (0, nest_1.TsRestHandler)(contracts_1.contract.shifts.deleteShift),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ShiftController.prototype, "deleteShift", null);
__decorate([
    (0, auth_decorator_1.Auth)(db_1.UserRole.ADMIN, db_1.UserRole.MANAGER),
    (0, nest_1.TsRestHandler)(contracts_1.contract.shifts.createShift),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ShiftController.prototype, "createShift", null);
exports.ShiftController = ShiftController = ShiftController_1 = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [shifts_service_1.ShiftService,
        logging_service_1.LoggingService])
], ShiftController);
//# sourceMappingURL=shifts.controller.js.map