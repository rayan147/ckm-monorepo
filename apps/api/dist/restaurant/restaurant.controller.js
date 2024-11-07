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
exports.RestaurantController = void 0;
const common_1 = require("@nestjs/common");
const nest_1 = require("@ts-rest/nest");
const contracts_1 = require("@ckm/contracts");
const restaurant_service_1 = require("./restaurant.service");
let RestaurantController = class RestaurantController {
    constructor(restaurantService) {
        this.restaurantService = restaurantService;
    }
    async createRestaurant() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.restaurant.createRestaurant, async ({ body }) => {
            const restaurant = await this.restaurantService.createRestaurant(body);
            return { status: common_1.HttpStatus.CREATED, body: restaurant };
        });
    }
    async getRestaurants() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.restaurant.getRestaurants, async ({ query }) => {
            const restaurants = await this.restaurantService.getRestaurants({
                skip: query.skip ? parseInt(query.skip) : undefined,
                take: query.take ? parseInt(query.take) : undefined,
                organizationId: query.organizationId
                    ? parseInt(query.organizationId)
                    : undefined,
            });
            return { status: common_1.HttpStatus.OK, body: restaurants };
        });
    }
    async getRestaurant() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.restaurant.getRestaurant, async ({ params }) => {
            const restaurant = await this.restaurantService.getRestaurant(params.id);
            return { status: common_1.HttpStatus.OK, body: restaurant };
        });
    }
    async updateRestaurant() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.restaurant.updateRestaurant, async ({ params, body }) => {
            const restaurant = await this.restaurantService.updateRestaurant(params.id, body);
            return { status: common_1.HttpStatus.OK, body: restaurant };
        });
    }
    async deleteRestaurant() {
        return (0, nest_1.tsRestHandler)(contracts_1.contract.restaurant.deleteRestaurant, async ({ params }) => {
            const restaurant = await this.restaurantService.deleteRestaurant(params.id);
            return { status: common_1.HttpStatus.OK, body: restaurant };
        });
    }
};
exports.RestaurantController = RestaurantController;
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.restaurant.createRestaurant),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RestaurantController.prototype, "createRestaurant", null);
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.restaurant.getRestaurants),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RestaurantController.prototype, "getRestaurants", null);
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.restaurant.getRestaurant),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RestaurantController.prototype, "getRestaurant", null);
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.restaurant.updateRestaurant),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RestaurantController.prototype, "updateRestaurant", null);
__decorate([
    (0, nest_1.TsRestHandler)(contracts_1.contract.restaurant.deleteRestaurant),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RestaurantController.prototype, "deleteRestaurant", null);
exports.RestaurantController = RestaurantController = __decorate([
    (0, nest_1.TsRest)({ jsonQuery: true }),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [restaurant_service_1.RestaurantService])
], RestaurantController);
//# sourceMappingURL=restaurant.controller.js.map