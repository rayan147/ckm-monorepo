"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PinpointModule = void 0;
const common_1 = require("@nestjs/common");
const pinpoint_service_1 = require("./pinpoint.service");
const env_module_1 = require("../env/env.module");
let PinpointModule = class PinpointModule {
};
exports.PinpointModule = PinpointModule;
exports.PinpointModule = PinpointModule = __decorate([
    (0, common_1.Module)({
        providers: [pinpoint_service_1.PinpointService],
        imports: [env_module_1.EnvModule],
        exports: [pinpoint_service_1.PinpointService],
    })
], PinpointModule);
//# sourceMappingURL=pinpoint.module.js.map