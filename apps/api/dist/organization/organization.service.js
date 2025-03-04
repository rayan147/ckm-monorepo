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
exports.OrganizationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let OrganizationService = class OrganizationService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createOrganization(data) {
        try {
            return this.prisma.organization.create({
                data,
            });
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException) {
                throw new common_1.BadRequestException('Could not create the organization', error);
            }
            throw new common_1.InternalServerErrorException();
        }
    }
    async getOrganizations(params) {
        const { skip, take, orderBy } = params;
        try {
            return this.prisma.organization.findMany({
                skip,
                take,
                orderBy: orderBy ? { [orderBy]: 'asc' } : undefined,
            });
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException) {
                throw new common_1.BadRequestException('Could not create the organization', error);
            }
            throw new common_1.InternalServerErrorException();
        }
    }
    async getOrganization(id) {
        try {
            return this.prisma.organization.findUnique({
                where: { id },
            });
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException) {
                throw new common_1.BadRequestException('Could not get the organization', error);
            }
            throw new common_1.InternalServerErrorException();
        }
    }
    async updateOrganization(id, data) {
        try {
            return this.prisma.organization.update({
                where: { id },
                data,
            });
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException) {
                throw new common_1.BadRequestException('Could not update the organization', error);
            }
            throw new common_1.InternalServerErrorException();
        }
    }
    async deleteOrganization(id) {
        try {
            return this.prisma.organization.delete({
                where: { id },
            });
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException) {
                throw new common_1.BadRequestException('Could not update the organization', error);
            }
            throw new common_1.InternalServerErrorException();
        }
    }
};
exports.OrganizationService = OrganizationService;
exports.OrganizationService = OrganizationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrganizationService);
//# sourceMappingURL=organization.service.js.map