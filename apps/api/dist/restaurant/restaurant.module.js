"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantModule = void 0;
const common_1 = require("@nestjs/common");
const restaurant_service_1 = require("./restaurant.service");
const restaurant_controller_1 = require("./restaurant.controller");
const organization_module_1 = require("../organization/organization.module");
const auth_module_1 = require("../auth/auth.module");
let RestaurantModule = class RestaurantModule {
};
exports.RestaurantModule = RestaurantModule;
exports.RestaurantModule = RestaurantModule = __decorate([
    (0, common_1.Module)({
        providers: [restaurant_service_1.RestaurantService],
        controllers: [restaurant_controller_1.RestaurantController],
        imports: [organization_module_1.OrganizationModule, auth_module_1.AuthModule],
    })
], RestaurantModule);
//# sourceMappingURL=restaurant.module.js.map