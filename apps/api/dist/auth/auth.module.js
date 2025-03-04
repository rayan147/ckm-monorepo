"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const users_module_1 = require("../users/users.module");
const prisma_module_1 = require("../prisma/prisma.module");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const auth_controller_1 = require("./auth.controller");
const jwt_strategy_1 = require("./jwt.strategy");
const i18n_module_1 = require("../i18n/i18n.module");
const role_guard_1 = require("../guards/role.guard");
const env_module_1 = require("../env/env.module");
const env_service_1 = require("../env/env.service");
const auth_sessions_service_1 = require("./utils/auth.sessions.service");
const aws_module_1 = require("../helpers/aws/aws.module");
const csrf_guard_1 = require("../csrf/csrf.guard");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            aws_module_1.AwsModule,
            i18n_module_1.I18nModule,
            (0, common_1.forwardRef)(() => users_module_1.UsersModule),
            prisma_module_1.PrismaModule,
            passport_1.PassportModule,
            env_module_1.EnvModule,
            jwt_1.JwtModule.registerAsync(({
                imports: [env_module_1.EnvModule],
                inject: [env_service_1.EnvService],
                useFactory: async (envService) => ({
                    secret: envService.get('JWT_SECRET_KEY'),
                    signOptions: { expiresIn: '60s' }
                })
            }))
        ],
        providers: [auth_service_1.AuthService, jwt_strategy_1.JwtStrategy, role_guard_1.RoleGuard, auth_sessions_service_1.AuthSessionsService, csrf_guard_1.CsrfGuard],
        controllers: [auth_controller_1.AuthController],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map