"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EarlyAccessModule = void 0;
const common_1 = require("@nestjs/common");
const early_access_controller_1 = require("./early-access.controller");
const early_access_service_1 = require("./early-access.service");
const pinpoint_module_1 = require("../pinpoint/pinpoint.module");
let EarlyAccessModule = class EarlyAccessModule {
};
exports.EarlyAccessModule = EarlyAccessModule;
exports.EarlyAccessModule = EarlyAccessModule = __decorate([
    (0, common_1.Module)({
        controllers: [early_access_controller_1.EarlyAccessController],
        providers: [early_access_service_1.EarlyAccessService],
        imports: [pinpoint_module_1.PinpointModule],
    })
], EarlyAccessModule);
//# sourceMappingURL=early-access.module.js.map