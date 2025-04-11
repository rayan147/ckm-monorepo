"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NutritionModule = void 0;
const common_1 = require("@nestjs/common");
const usda_api_service_1 = require("../usda-api/usda-api.service");
const nutrition_service_service_1 = require("./nutrition-service.service");
const nutrition_service_controller_1 = require("./nutrition-service.controller");
const axios_1 = require("@nestjs/axios");
const env_module_1 = require("../env/env.module");
let NutritionModule = class NutritionModule {
};
exports.NutritionModule = NutritionModule;
exports.NutritionModule = NutritionModule = __decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule, env_module_1.EnvModule],
        providers: [nutrition_service_service_1.NutritionService, usda_api_service_1.UsdaApiService],
        controllers: [nutrition_service_controller_1.NutritionController],
        exports: [nutrition_service_service_1.NutritionService],
    })
], NutritionModule);
//# sourceMappingURL=nutrition-service.module.js.map