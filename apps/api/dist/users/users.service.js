"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const db_1 = require("@ckm/db");
const common_1 = require("@nestjs/common");
const bcrypt = __importStar(require("bcryptjs"));
const logging_service_1 = require("../logging/logging.service");
const prisma_service_1 = require("../prisma/prisma.service");
let UserService = class UserService {
    constructor(prisma, logger) {
        this.prisma = prisma;
        this.logger = logger;
    }
    async getAuthUserByEmail(email) {
        try {
            return await this.prisma.user.findUnique({ where: { email }, include: { auth: true } });
        }
        catch (error) {
            this.logger.handleError(error, 'Database error in getAuthUserByEmail');
        }
    }
    async getUserByEmail(email) {
        try {
            return await this.prisma.user.findUnique({ where: { email } });
        }
        catch (error) {
            this.logger.handleError(error, 'Database error in getUserByEmail');
        }
    }
    async getUser(id) {
        try {
            return await this.prisma.user.findUnique({
                where: { id },
            });
        }
        catch (error) {
            this.logger.handleError(error, 'Database error in getUser');
        }
    }
    async getAuthUser(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            include: {
                auth: true,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async getUsers(params) {
        const { skip, take, orderBy } = params;
        return this.prisma.user.findMany({
            skip,
            take,
            orderBy: orderBy ? { [orderBy]: 'asc' } : undefined,
        });
    }
    async createUser(userData) {
        try {
            const hashedPassword = await bcrypt.hash(userData.password, 10);
            const { password, role = db_1.UserRole.STAFF, isOrganization, organizationInput, restaurantsInput } = userData, userDataWithoutAuth = __rest(userData, ["password", "role", "isOrganization", "organizationInput", "restaurantsInput"]);
            return await this.prisma.$transaction(async (tx) => {
                let organization = null;
                if (isOrganization && organizationInput) {
                    organization = await tx.organization.create({
                        data: {
                            name: organizationInput.name,
                            imageUrl: organizationInput.imageUrl,
                        },
                    });
                    this.logger.log('Organization created: ' + organization.id);
                }
                const user = await tx.user.create({
                    data: Object.assign(Object.assign(Object.assign({}, userDataWithoutAuth), { auth: {
                            create: {
                                passwordHash: hashedPassword,
                                role: role,
                            },
                        } }), (organization ? { organization: { connect: { id: organization.id } } } : {})),
                    include: {
                        organization: true,
                    },
                });
                this.logger.log('User created: ' + user.id);
                if (restaurantsInput && restaurantsInput.length > 0) {
                    for (const restaurantData of restaurantsInput) {
                        const restaurant = await tx.restaurant.create({
                            data: Object.assign(Object.assign(Object.assign({}, restaurantData), (organization ? { organization: { connect: { id: organization.id } } } : {})), { users: {
                                    connect: { id: user.id },
                                } }),
                        });
                        this.logger.log('Restaurant created: ' + restaurant.id);
                    }
                }
                return user;
            });
        }
        catch (error) {
            this.logger.handleError(error, 'Error creating user with organization and restaurants');
        }
    }
    async updateUser(userId, data) {
        try {
            return await this.prisma.user.update({
                where: { id: userId },
                data,
            });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
    }
    async deleteUser(userId) {
        try {
            return await this.prisma.user.delete({ where: { id: userId } });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
    }
    async updateUserRole(userId, newRole) {
        try {
            const user = await this.getAuthUser(userId);
            const priorityOrder = [db_1.UserRole.ADMIN, db_1.UserRole.MANAGER, db_1.UserRole.STAFF];
            const sortedAuth = [...user.auth].sort((a, b) => {
                return priorityOrder.indexOf(a.role) - priorityOrder.indexOf(b.role);
            });
            const authToUpdate = sortedAuth[0];
            await this.prisma.auth.update({
                where: { id: authToUpdate.id },
                data: { role: newRole },
            });
            return this.getUser(userId);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
    }
    async getUsersByRole(role) {
        try {
            return await this.prisma.user.findMany({
                where: {
                    auth: {
                        some: {
                            role: role,
                        },
                    },
                },
                include: {
                    auth: true,
                },
            });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        logging_service_1.LoggingService])
], UserService);
//# sourceMappingURL=users.service.js.map