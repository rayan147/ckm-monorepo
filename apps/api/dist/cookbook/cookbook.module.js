"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CookBookModule = void 0;
const common_1 = require("@nestjs/common");
const cookbook_service_1 = require("./cookbook.service");
const cookbook_controller_1 = require("./cookbook.controller");
let CookBookModule = class CookBookModule {
};
exports.CookBookModule = CookBookModule;
exports.CookBookModule = CookBookModule = __decorate([
    (0, common_1.Module)({
        providers: [cookbook_service_1.CookBookService],
        controllers: [cookbook_controller_1.CookBookController],
    })
], CookBookModule);
//# sourceMappingURL=cookbook.module.js.map