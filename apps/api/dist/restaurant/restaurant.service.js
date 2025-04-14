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
exports.RestaurantService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const db_1 = require("@ckm/db");
const organization_service_1 = require("../organization/organization.service");
const logging_service_1 = require("../logging/logging.service");
let RestaurantService = class RestaurantService {
    constructor(prisma, organizationService, logger) {
        this.prisma = prisma;
        this.organizationService = organizationService;
        this.logger = logger;
    }
    async createRestaurant(data) {
        var _a, _b;
        try {
            const createData = {
                name: data.name,
                address: data.address,
                imageUrl: data.imageUrl,
                city: data.city,
                state: data.state,
                zipCode: data.zipCode,
                owner: data.owner,
                organization: data.organization
                    ? { connect: { id: (_b = (_a = data.organization) === null || _a === void 0 ? void 0 : _a.connect) === null || _b === void 0 ? void 0 : _b.id } }
                    : undefined,
            };
            const restaurant = await this.prisma.restaurant.create({
                data: createData,
                include: {
                    organization: true,
                    users: true,
                    cookbooks: {
                        include: {
                            recipes: true,
                        },
                    },
                    inventory: true,
                    orders: true,
                },
            });
            return restaurant;
        }
        catch (error) {
            if (error instanceof db_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new common_1.BadRequestException('A restaurant with this name already exists');
                }
            }
            this.logger.error(error);
            throw new common_1.InternalServerErrorException('Failed to create restaurant');
        }
    }
    async getRestaurants(params) {
        const { skip, take, organizationId } = params;
        const findManyData = {
            skip,
            take,
            include: {
                orders: true,
                inventory: true,
            },
        };
        const whereInput = {
            organizationId,
            isDeleted: false,
        };
        try {
            return await this.prisma.restaurant.findMany(Object.assign({ where: whereInput }, findManyData));
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to fetch restaurants');
        }
    }
    async getRestaurant(id) {
        try {
            const restaurant = await this.prisma.restaurant.findUnique({
                where: { id, isDeleted: false },
                include: {
                    menus: {
                        include: {
                            menuItems: true
                        }
                    }
                }
            });
            if (!restaurant)
                throw new common_1.NotFoundException('Restaurant not found');
            return restaurant;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException)
                throw error;
            throw new common_1.BadRequestException('Failed to fetch restaurant');
        }
    }
    async updateRestaurant(id, data) {
        try {
            return await this.prisma.restaurant.update({
                where: { id },
                data,
            });
        }
        catch (error) {
            if (error instanceof db_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new common_1.NotFoundException('Restaurant not found');
                }
            }
            throw new common_1.BadRequestException('Failed to update restaurant');
        }
    }
    async deleteRestaurant(id) {
        try {
            const now = new Date().toISOString();
            return await this.prisma.restaurant.update({
                where: { id },
                data: { isDeleted: true, deleted: now },
            });
        }
        catch (error) {
            if (error instanceof db_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new common_1.NotFoundException('Restaurant not found');
                }
                throw new common_1.BadRequestException(error);
            }
            if (error instanceof common_1.InternalServerErrorException) {
                throw new common_1.InternalServerErrorException(error);
            }
            throw error;
        }
    }
};
exports.RestaurantService = RestaurantService;
exports.RestaurantService = RestaurantService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        organization_service_1.OrganizationService,
        logging_service_1.LoggingService])
], RestaurantService);
//# sourceMappingURL=restaurant.service.js.map