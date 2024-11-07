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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EarlyAccessService = void 0;
const common_1 = require("@nestjs/common");
const pinpoint_service_1 = require("../pinpoint/pinpoint.service");
const prisma_service_1 = require("../prisma/prisma.service");
const logging_service_1 = require("../logging/logging.service");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
let EarlyAccessService = class EarlyAccessService {
    constructor(pinPointService, prisma, logger) {
        this.pinPointService = pinPointService;
        this.prisma = prisma;
        this.logger = logger;
        this.earlyAccessTemplate = fs_1.default.readFileSync(path_1.default.join(process.cwd(), './src/early-access/templates/early-access-email.html'), 'utf8');
    }
    async storeEmail(email) {
        try {
            const hasEmail = await this.prisma.earlyAccess.findUnique({
                where: { email },
            });
            if (hasEmail) {
                return null;
            }
            const storeEmail = await this.prisma.earlyAccess.create({
                data: { email, isEmailSent: false },
            });
            if (!storeEmail)
                throw new common_1.BadRequestException();
            const htmlBody = this.earlyAccessTemplate.replace(/{{email}}/g, storeEmail.email);
            const sendEmail = await this.pinPointService.sendEmail(email, 'Welcome to CKM Early Access', htmlBody);
            if (sendEmail) {
                await this.prisma.earlyAccess.update({
                    where: { id: storeEmail.id },
                    data: { isEmailSent: true },
                });
            }
            return storeEmail;
        }
        catch (error) {
            this.logger.handleError(`could not store the email ${error}`, `error`);
        }
    }
    async getEmails(params) {
        const { skip, take, orderBy, isEmailSent } = params;
        try {
            const emails = await this.prisma.earlyAccess.findMany({
                skip,
                take,
                orderBy: orderBy ? { [orderBy]: 'asc' } : undefined,
            });
            if (!emails)
                throw common_1.BadRequestException;
            return emails;
        }
        catch (error) {
            this.logger.handleError(`This is  getEmails ${error}`, `getEmail`);
        }
    }
    async getEmail(id) {
        try {
            return await this.prisma.earlyAccess.findUnique({
                where: { id },
            });
        }
        catch (error) {
            this.logger.handleError(`Error ${error}`, `getEmail`);
        }
    }
    async deleteEmail(id) {
        try {
            return await this.prisma.earlyAccess.delete({
                where: { id },
            });
        }
        catch (error) {
            this.logger.handleError(`Error ${error}`, `deleteEmail`);
        }
    }
};
exports.EarlyAccessService = EarlyAccessService;
exports.EarlyAccessService = EarlyAccessService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [pinpoint_service_1.PinpointService,
        prisma_service_1.PrismaService,
        logging_service_1.LoggingService])
], EarlyAccessService);
//# sourceMappingURL=early-access.service.js.map