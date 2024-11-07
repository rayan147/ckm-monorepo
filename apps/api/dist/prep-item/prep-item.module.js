"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrepItemModule = void 0;
const common_1 = require("@nestjs/common");
const prep_item_service_1 = require("./prep-item.service");
const prep_item_controller_1 = require("./prep-item.controller");
let PrepItemModule = class PrepItemModule {
};
exports.PrepItemModule = PrepItemModule;
exports.PrepItemModule = PrepItemModule = __decorate([
    (0, common_1.Module)({
        providers: [prep_item_service_1.PrepItemService],
        controllers: [prep_item_controller_1.PrepItemController],
    })
], PrepItemModule);
//# sourceMappingURL=prep-item.module.js.map