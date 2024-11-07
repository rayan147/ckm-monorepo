"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryManagementModule = void 0;
const common_1 = require("@nestjs/common");
const inventory_management_controller_1 = require("./inventory-management.controller");
const inventory_management_service_1 = require("./inventory-management.service");
let InventoryManagementModule = class InventoryManagementModule {
};
exports.InventoryManagementModule = InventoryManagementModule;
exports.InventoryManagementModule = InventoryManagementModule = __decorate([
    (0, common_1.Module)({
        controllers: [inventory_management_controller_1.InventoryManagementController],
        providers: [inventory_management_service_1.InventoryManagementService],
    })
], InventoryManagementModule);
//# sourceMappingURL=inventory-management.module.js.map