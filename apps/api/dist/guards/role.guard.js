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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const TE = __importStar(require("fp-ts/TaskEither"));
const T = __importStar(require("fp-ts/Task"));
const function_1 = require("fp-ts/function");
const E = __importStar(require("fp-ts/Either"));
const prisma_service_1 = require("../prisma/prisma.service");
const O = __importStar(require("fp-ts/Option"));
let RoleGuard = class RoleGuard {
    constructor(reflector, prisma) {
        this.reflector = reflector;
        this.prisma = prisma;
    }
    async canActivate(context) {
        const getRequiredRoles = () => (0, function_1.pipe)(O.fromNullable(this.reflector.getAllAndOverride('roles', [
            context.getHandler(),
            context.getClass(),
        ])), O.fold(() => E.left(new common_1.UnauthorizedException('No roles required')), E.right));
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const isUserSub = (user) => (0, function_1.pipe)(O.fromNullable(user.sub));
        const findUser = (sub) => TE.tryCatch(() => this.prisma.user.findUnique({ where: { id: sub } }), E.toError);
        return (0, function_1.pipe)(getRequiredRoles(), E.fold(() => T.of(true), (requiredRoles) => (0, function_1.pipe)(isUserSub(user), O.fold(() => T.of(false), (sub) => (0, function_1.pipe)(findUser(sub), TE.chain(TE.fromNullable(new Error('User not found in database'))), TE.map((dbUser) => requiredRoles.includes(dbUser.role)), TE.getOrElse(() => T.of(false)))))))();
    }
};
exports.RoleGuard = RoleGuard;
exports.RoleGuard = RoleGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        prisma_service_1.PrismaService])
], RoleGuard);
//# sourceMappingURL=role.guard.js.map