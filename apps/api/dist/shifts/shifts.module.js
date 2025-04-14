"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShiftModule = void 0;
const common_1 = require("@nestjs/common");
const shifts_service_1 = require("./shifts.service");
const shifts_controller_1 = require("./shifts.controller");
const prisma_service_1 = require("../prisma/prisma.service");
const logging_module_1 = require("../logging/logging.module");
const auth_sessions_service_1 = require("../auth/utils/auth.sessions.service");
const env_module_1 = require("../env/env.module");
const csrf_module_1 = require("../csrf/csrf.module");
const auth_module_1 = require("../auth/auth.module");
let ShiftModule = class ShiftModule {
};
exports.ShiftModule = ShiftModule;
exports.ShiftModule = ShiftModule = __decorate([
    (0, common_1.Module)({
        imports: [logging_module_1.LoggingModule, env_module_1.EnvModule, csrf_module_1.CsrfModule, auth_module_1.AuthModule],
        providers: [shifts_service_1.ShiftService, prisma_service_1.PrismaService, auth_sessions_service_1.AuthSessionsService],
        controllers: [shifts_controller_1.ShiftController],
        exports: [shifts_service_1.ShiftService],
    })
], ShiftModule);
//# sourceMappingURL=shifts.module.js.map