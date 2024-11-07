"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuItemModule = void 0;
const common_1 = require("@nestjs/common");
const menu_item_service_1 = require("./menu-item.service");
const menu_item_controller_1 = require("./menu-item.controller");
const recipe_module_1 = require("../recipe/recipe.module");
let MenuItemModule = class MenuItemModule {
};
exports.MenuItemModule = MenuItemModule;
exports.MenuItemModule = MenuItemModule = __decorate([
    (0, common_1.Module)({
        providers: [menu_item_service_1.MenuItemService],
        controllers: [menu_item_controller_1.MenuItemController],
        imports: [recipe_module_1.RecipeModule],
    })
], MenuItemModule);
//# sourceMappingURL=menu-item.module.js.map