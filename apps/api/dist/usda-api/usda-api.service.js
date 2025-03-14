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
exports.UsdaApiService = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const axios_1 = require("@nestjs/axios");
const env_service_1 = require("../env/env.service");
let UsdaApiService = class UsdaApiService {
    constructor(httpService, envService) {
        this.httpService = httpService;
        this.envService = envService;
        this.baseUrl = 'https://api.nal.usda.gov/fdc/v1';
        this.apiKey = this.envService.get('USDA_API_KEY');
        if (!this.apiKey) {
            console.warn('USDA_API_KEY is not set. USDA food data API calls will fail.');
        }
    }
    async searchFoods(query, pageSize = 25) {
        try {
            const url = `${this.baseUrl}/foods/search`;
            const params = {
                api_key: this.apiKey,
                query,
                pageSize,
                dataType: 'Foundation,SR Legacy'
            };
            const { data } = await (0, rxjs_1.firstValueFrom)(this.httpService.get(url, { params }).pipe((0, rxjs_1.catchError)((error) => {
                var _a;
                console.error('Error searching USDA foods:', ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
                throw new Error(`Failed to search foods: ${error.message}`);
            })));
            return data;
        }
        catch (error) {
            console.error('Error in searchFoods:', error);
            return { foods: [] };
        }
    }
    async getFoodNutrition(fdcId) {
        try {
            const url = `${this.baseUrl}/food/${fdcId}`;
            const { data } = await (0, rxjs_1.firstValueFrom)(this.httpService.get(url, {
                params: {
                    api_key: this.apiKey,
                    format: 'full',
                },
            }).pipe((0, rxjs_1.catchError)((error) => {
                var _a;
                console.error('Error fetching food details:', ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
                throw new Error(`Failed to get food details: ${error.message}`);
            })));
            return data;
        }
        catch (error) {
            console.error('Error in getFoodNutrition:', error);
            return null;
        }
    }
};
exports.UsdaApiService = UsdaApiService;
exports.UsdaApiService = UsdaApiService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        env_service_1.EnvService])
], UsdaApiService);
//# sourceMappingURL=usda-api.service.js.map