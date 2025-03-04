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
exports.VendorController = void 0;
const common_1 = require("@nestjs/common");
const nest_1 = require("@ts-rest/nest");
const contracts_1 = require("@ckm/contracts");
const vendor_service_1 = require("./vendor.service");
let VendorController = class VendorController {
    constructor(vendorService) {
        this.vendorService = vendorService;
    }
    async createVendor() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.vendor.createVendor, async ({ body }) => {
            const vendor = await this.vendorService.createVendor(body);
            return { status: 201, body: vendor };
        });
    }
    async getVendors() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.vendor.getVendors, async ({ query }) => {
            const vendors = await this.vendorService.getVendors({
                skip: query.skip ? parseInt(query.skip) : undefined,
                take: query.take ? parseInt(query.take) : undefined,
                name: query.name,
            });
            return { status: 200, body: vendors };
        });
    }
    async getVendor() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.vendor.getVendor, async ({ params }) => {
            const vendor = await this.vendorService.getVendor(params.id);
            if (!vendor) {
                return { status: 404, body: { message: 'Vendor not found' } };
            }
            return { status: 200, body: vendor };
        });
    }
    async updateVendor() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.vendor.updateVendor, async ({ params, body }) => {
            const vendor = await this.vendorService.updateVendor(params.id, body);
            if (!vendor) {
                return { status: 404, body: { message: 'Vendor not found' } };
            }
            return { status: 200, body: vendor };
        });
    }
    async deleteVendor() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.vendor.deleteVendor, async ({ params }) => {
            const vendor = await this.vendorService.deleteVendor(params.id);
            if (!vendor) {
                return { status: 404, body: { message: 'Vendor not found' } };
            }
            return { status: 200, body: vendor };
        });
    }
};
exports.VendorController = VendorController;
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.vendor.createVendor),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VendorController.prototype, "createVendor", null);
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.vendor.getVendors),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VendorController.prototype, "getVendors", null);
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.vendor.getVendor),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VendorController.prototype, "getVendor", null);
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.vendor.updateVendor),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VendorController.prototype, "updateVendor", null);
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.vendor.deleteVendor),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VendorController.prototype, "deleteVendor", null);
exports.VendorController = VendorController = __decorate([
    (0, nest_1.TsRest)({ jsonQuery: true }),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [vendor_service_1.VendorService])
], VendorController);
//# sourceMappingURL=vendor.controller.js.map