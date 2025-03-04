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
exports.EarlyAccessController = void 0;
const common_1 = require("@nestjs/common");
const nest_1 = require("@ts-rest/nest");
const contracts_1 = require("@ckm/contracts");
const early_access_service_1 = require("./early-access.service");
const logging_service_1 = require("../logging/logging.service");
let EarlyAccessController = class EarlyAccessController {
    constructor(earlyAccessService, logger) {
        this.earlyAccessService = earlyAccessService;
        this.logger = logger;
    }
    async storeEmail() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.earlyAccess.storeEmail, async ({ body }) => {
            this.logger.log('Received request to store an email');
            const emails = await this.earlyAccessService.storeEmail(body.email);
            return { status: 201, body: emails };
        });
    }
    async getEmails() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.earlyAccess.getEmails, async ({ query }) => {
            this.logger.log('Received request to get all emails');
            const emails = await this.earlyAccessService.getEmails({
                skip: query.skip ? parseInt(query.skip) : undefined,
                take: query.take ? parseInt(query.take) : undefined,
                orderBy: query.orderBy,
                isEmailSent: query.isEmailSent ? query.isEmailSent : undefined,
            });
            return { status: 201, body: emails };
        });
    }
    async deleteEmails() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.earlyAccess.deleteEmail, async ({ params }) => {
            this.logger.log('Received request to delete an email');
            const emails = await this.earlyAccessService.deleteEmail(params.id);
            return { status: 201, body: emails };
        });
    }
    async get() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.earlyAccess.getEmail, async ({ params }) => {
            this.logger.log('Received request to get an email');
            const emails = await this.earlyAccessService.getEmail(params.id);
            return { status: 201, body: emails };
        });
    }
};
exports.EarlyAccessController = EarlyAccessController;
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.earlyAccess.storeEmail),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EarlyAccessController.prototype, "storeEmail", null);
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.earlyAccess.getEmails),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EarlyAccessController.prototype, "getEmails", null);
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.earlyAccess.deleteEmail),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EarlyAccessController.prototype, "deleteEmails", null);
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.earlyAccess.getEmail),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EarlyAccessController.prototype, "get", null);
exports.EarlyAccessController = EarlyAccessController = __decorate([
    (0, nest_1.TsRest)({ jsonQuery: true }),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [early_access_service_1.EarlyAccessService,
        logging_service_1.LoggingService])
], EarlyAccessController);
//# sourceMappingURL=early-access.controller.js.map