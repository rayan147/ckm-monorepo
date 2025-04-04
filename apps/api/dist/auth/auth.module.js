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
const passport_1 = require("@nestjs/passport");
const csrf_guard_1 = require("../csrf/csrf.guard");
const env_module_1 = require("../env/env.module");
const aws_module_1 = require("../helpers/aws/aws.module");
const i18n_module_1 = require("../i18n/i18n.module");
const role_guard_1 = require("../guards/role.guard");
const prisma_module_1 = require("../prisma/prisma.module");
const users_module_1 = require("../users/users.module");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const auth_sessions_service_1 = require("./utils/auth.sessions.service");
const email_template_service_1 = require("../templates/email-template.service");
const auth_session_middleware_service_1 = require("./auth.session.middleware.service");
const csrf_module_1 = require("../csrf/csrf.module");
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
            csrf_module_1.CsrfModule
        ],
        providers: [auth_service_1.AuthService, role_guard_1.RoleGuard, auth_sessions_service_1.AuthSessionsService, csrf_guard_1.CsrfGuard, auth_session_middleware_service_1.SessionInitMiddleware, email_template_service_1.EmailTemplateService],
        controllers: [auth_controller_1.AuthController],
        exports: [auth_service_1.AuthService, auth_sessions_service_1.AuthSessionsService],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map