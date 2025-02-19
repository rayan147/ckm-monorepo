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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = __importStar(require("bcryptjs"));
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getUserByEmail(email) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async getUser(id) {
        const user = await this.prisma.user.findUnique({ where: { id } });
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
    async createUser(data) {
        try {
            const hashedPassword = await bcrypt.hash(data.passwordHash, 10);
            const { restaurantId, organizationId } = data, rest = __rest(data, ["restaurantId", "organizationId"]);
            const createData = Object.assign(Object.assign({}, rest), { passwordHash: hashedPassword });
            if (organizationId) {
                createData.organization = { connect: { id: organizationId } };
            }
            if (restaurantId) {
                createData.restaurant = { connect: { id: restaurantId } };
            }
            return await this.prisma.user.create({ data: createData });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
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
    async deleteSession(userId, sessionToken) {
        try {
            await this.prisma.session.delete({
                where: { token: sessionToken },
            });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
    }
    async updateUserRole(userId, newRole) {
        try {
            return await this.prisma.user.update({
                where: { id: userId },
                data: { role: newRole },
            });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
    }
    async getUsersByRole(role) {
        try {
            return await this.prisma.user.findMany({ where: { role } });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=users.service.js.map