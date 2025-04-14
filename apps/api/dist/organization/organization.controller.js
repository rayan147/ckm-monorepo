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
exports.OrganizationController = void 0;
const common_1 = require("@nestjs/common");
const nest_1 = require("@ts-rest/nest");
const contracts_1 = require("@ckm/contracts");
const organization_service_1 = require("./organization.service");
const db_1 = require("@ckm/db");
const auth_decorator_1 = require("../decorators/auth.decorator");
let OrganizationController = class OrganizationController {
    constructor(organizationService) {
        this.organizationService = organizationService;
    }
    async createOrganization() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.orgs.createOrganization, async ({ body }) => {
            const organization = await this.organizationService.createOrganization(body);
            return { status: 201, body: organization };
        });
    }
    async getOrganizations() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.orgs.getOrganizations, async ({ query }) => {
            const organizations = await this.organizationService.getOrganizations({
                skip: query.skip ? parseInt(query.skip) : undefined,
                take: query.take ? parseInt(query.take) : undefined,
                orderBy: query.orderBy,
            });
            return { status: 200, body: organizations };
        });
    }
    async getOrganization() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.orgs.getOrganization, async ({ params }) => {
            const organization = await this.organizationService.getOrganization(params.id);
            if (!organization) {
                return { status: 404, body: { message: 'Organization not found' } };
            }
            return { status: 200, body: organization };
        });
    }
    async updateOrganization() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.orgs.updateOrganization, async ({ params, body }) => {
            const organization = await this.organizationService.updateOrganization(params.id, body);
            return { status: 200, body: organization };
        });
    }
    async deleteOrganization() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.orgs.deleteOrganization, async ({ params }) => {
            const organization = await this.organizationService.deleteOrganization(params.id);
            return { status: 200, body: organization };
        });
    }
};
exports.OrganizationController = OrganizationController;
__decorate([
    (0, auth_decorator_1.Auth)(db_1.UserRole.ADMIN),
    (0, nest_1.TsRestHandler)(contracts_1.contract.orgs.createOrganization),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "createOrganization", null);
__decorate([
    (0, auth_decorator_1.Auth)(db_1.UserRole.ADMIN),
    (0, nest_1.TsRestHandler)(contracts_1.contract.orgs.getOrganizations),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "getOrganizations", null);
__decorate([
    (0, auth_decorator_1.Auth)(db_1.UserRole.ADMIN, db_1.UserRole.MANAGER),
    (0, nest_1.TsRestHandler)(contracts_1.contract.orgs.getOrganization),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "getOrganization", null);
__decorate([
    (0, auth_decorator_1.Auth)(db_1.UserRole.ADMIN),
    (0, nest_1.TsRestHandler)(contracts_1.contract.orgs.updateOrganization),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "updateOrganization", null);
__decorate([
    (0, auth_decorator_1.Auth)(db_1.UserRole.ADMIN),
    (0, nest_1.TsRestHandler)(contracts_1.contract.orgs.deleteOrganization),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "deleteOrganization", null);
exports.OrganizationController = OrganizationController = __decorate([
    (0, nest_1.TsRest)({ jsonQuery: true }),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [organization_service_1.OrganizationService])
], OrganizationController);
//# sourceMappingURL=organization.controller.js.map