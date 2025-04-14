"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationModule = void 0;
const common_1 = require("@nestjs/common");
const organization_controller_1 = require("./organization.controller");
const organization_service_1 = require("./organization.service");
const env_module_1 = require("../env/env.module");
const auth_sessions_service_1 = require("../auth/utils/auth.sessions.service");
const csrf_module_1 = require("../csrf/csrf.module");
const auth_module_1 = require("../auth/auth.module");
let OrganizationModule = class OrganizationModule {
};
exports.OrganizationModule = OrganizationModule;
exports.OrganizationModule = OrganizationModule = __decorate([
    (0, common_1.Module)({
        imports: [env_module_1.EnvModule, csrf_module_1.CsrfModule, auth_module_1.AuthModule],
        controllers: [organization_controller_1.OrganizationController],
        providers: [organization_service_1.OrganizationService, auth_sessions_service_1.AuthSessionsService],
        exports: [organization_service_1.OrganizationService],
    })
], OrganizationModule);
//# sourceMappingURL=organization.module.js.map