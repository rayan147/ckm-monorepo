"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CsrfModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const env_service_1 = require("../env/env.service");
const csrf_controller_1 = require("./csrf.controller");
const csrf_guard_1 = require("./csrf.guard");
let CsrfModule = class CsrfModule {
};
exports.CsrfModule = CsrfModule;
exports.CsrfModule = CsrfModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule],
        controllers: [csrf_controller_1.CsrfController],
        providers: [env_service_1.EnvService, csrf_guard_1.CsrfGuard],
        exports: [csrf_guard_1.CsrfGuard]
    })
], CsrfModule);
//# sourceMappingURL=csrf.module.js.map