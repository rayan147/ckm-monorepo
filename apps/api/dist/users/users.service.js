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
const bcrypt = __importStar(require("bcrypt"));
const function_1 = require("fp-ts/function");
const TE = __importStar(require("fp-ts/TaskEither"));
const E = __importStar(require("fp-ts/Either"));
const O = __importStar(require("fp-ts/Option"));
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
        this.getUserByEmail = (email) => {
            const performGetUserByEmail = TE.tryCatchK((email) => this.prisma.user.findUnique({ where: { email } }), E.toError);
            return (0, function_1.pipe)(email, performGetUserByEmail, TE.flatMap(TE.fromNullable(new common_1.NotFoundException('User not found'))));
        };
        this.getUser = (id) => {
            const performGetUser = TE.tryCatchK((id) => this.prisma.user.findUnique({ where: { id } }), E.toError);
            return (0, function_1.pipe)(id, performGetUser, TE.flatMap(TE.fromNullable(new common_1.NotFoundException('User not found'))));
        };
        this.getUsers = (params) => {
            const { skip, take, orderBy } = params;
            const performGetUsers = TE.tryCatchK(() => this.prisma.user.findMany({
                skip,
                take,
                orderBy: orderBy ? { [orderBy]: 'asc' } : undefined,
            }), E.toError);
            return (0, function_1.pipe)(params, performGetUsers);
        };
        this.createUser = (data) => {
            const hashPassword = (userData) => TE.tryCatch(() => bcrypt.hash(data.passwordHash, 10), E.toError);
            const performUserCreation = (passwordHash) => (userData) => {
                return TE.tryCatch(async () => {
                    const { restaurantId, organizationId } = userData, rest = __rest(userData, ["restaurantId", "organizationId"]);
                    let createData = Object.assign(Object.assign({}, rest), { passwordHash });
                    if (organizationId) {
                        createData.organization = { connect: { id: organizationId } };
                    }
                    if (restaurantId) {
                        createData.restaurant = { connect: { id: restaurantId } };
                    }
                    return this.prisma.user.create({ data: createData });
                }, E.toError);
            };
            return (0, function_1.pipe)(data, hashPassword, TE.flatMap((password) => (0, function_1.pipe)(data, performUserCreation(password))));
        };
        this.updateUser = (userId, data) => {
            const performUpdate = (id) => (data) => (0, function_1.pipe)(TE.tryCatch(() => this.prisma.user.update({
                data,
                where: { id },
            }), E.toError));
            return (0, function_1.pipe)(data, performUpdate(userId));
        };
        this.deleteUser = (userId) => {
            const performUserDeletion = TE.tryCatchK((id) => this.prisma.user.delete({ where: { id } }), E.toError);
            return (0, function_1.pipe)(userId, performUserDeletion);
        };
        this.deleteSession = (userId, sessionToken) => {
            const performUserDeletionSession = (userId) => (sessionToken) => TE.tryCatch(() => this.prisma.session.delete({
                where: { token: sessionToken, userId: userId },
            }), E.toError);
            return (0, function_1.pipe)(sessionToken, performUserDeletionSession(userId), TE.map(() => O.none));
        };
        this.updateUserRole = (userId, newRole) => (0, function_1.pipe)(TE.tryCatch(() => this.prisma.user.update({
            where: { id: userId },
            data: { role: newRole },
        }), E.toError));
        this.getUsersByRole = (role) => (0, function_1.pipe)(TE.tryCatch(() => this.prisma.user.findMany({ where: { role } }), E.toError));
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=users.service.js.map