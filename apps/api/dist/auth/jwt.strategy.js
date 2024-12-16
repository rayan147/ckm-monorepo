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
exports.JwtStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const E = __importStar(require("fp-ts/Either"));
const function_1 = require("fp-ts/function");
const O = __importStar(require("fp-ts/Option"));
const TE = __importStar(require("fp-ts/TaskEither"));
const passport_jwt_1 = require("passport-jwt");
const env_service_1 = require("../env/env.service");
const prisma_service_1 = require("../prisma/prisma.service");
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor(prisma, envService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: envService.get('JWT_SECRET_KEY'),
            passReqToCallback: true,
        });
        this.prisma = prisma;
    }
    async validate(req, payload) {
        const getSessionToken = (req) => { var _a; return O.fromNullable((_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1]); };
        const findUserToken = TE.tryCatchK((sessionToken) => this.prisma.session.findUnique({
            where: { token: sessionToken },
            include: { user: true },
        }), E.toError);
        return (0, function_1.pipe)(getSessionToken(req), O.getOrElseW(() => {
            throw new common_1.UnauthorizedException('Session token is missing');
        }), findUserToken, TE.flatMap(TE.fromNullable(new common_1.NotFoundException('User session not found in database'))), TE.map((dbUser) => {
            const isValidSession = dbUser.userId !== payload.sub || dbUser.expiresAt < new Date();
            return isValidSession;
        }), TE.chainW(TE.fromPredicate((isValidSession) => isValidSession, () => new common_1.UnauthorizedException('No valid session'))))();
    }
};
exports.JwtStrategy = JwtStrategy;
exports.JwtStrategy = JwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, env_service_1.EnvService])
], JwtStrategy);
//# sourceMappingURL=jwt.strategy.js.map