"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeModule = void 0;
const common_1 = require("@nestjs/common");
const recipe_service_1 = require("./recipe.service");
const recipe_controller_1 = require("./recipe.controller");
const prisma_service_1 = require("../prisma/prisma.service");
const logging_module_1 = require("../logging/logging.module");
const encryption_module_1 = require("../helpers/encryption/encryption.module");
const aws_module_1 = require("../helpers/aws/aws.module");
const env_module_1 = require("../env/env.module");
const ingredient_module_1 = require("../ingredient/ingredient.module");
const platform_express_1 = require("@nestjs/platform-express");
const auth_module_1 = require("../auth/auth.module");
let RecipeModule = class RecipeModule {
};
exports.RecipeModule = RecipeModule;
exports.RecipeModule = RecipeModule = __decorate([
    (0, common_1.Module)({
        imports: [
            platform_express_1.MulterModule.register(),
            logging_module_1.LoggingModule,
            encryption_module_1.EncryptionModule,
            aws_module_1.AwsModule,
            env_module_1.EnvModule,
            ingredient_module_1.IngredientModule,
            auth_module_1.AuthModule,
        ],
        providers: [recipe_service_1.RecipeService, prisma_service_1.PrismaService],
        controllers: [recipe_controller_1.RecipeController],
        exports: [recipe_service_1.RecipeService],
    })
], RecipeModule);
//# sourceMappingURL=recipe.module.js.map