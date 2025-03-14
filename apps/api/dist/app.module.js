"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const users_module_1 = require("./users/users.module");
const prisma_service_1 = require("./prisma/prisma.service");
const prisma_module_1 = require("./prisma/prisma.module");
const organization_controller_1 = require("./organization/organization.controller");
const organization_service_1 = require("./organization/organization.service");
const cookbook_controller_1 = require("./cookbook/cookbook.controller");
const cookbook_module_1 = require("./cookbook/cookbook.module");
const cookbook_service_1 = require("./cookbook/cookbook.service");
const order_service_1 = require("./order/order.service");
const order_controller_1 = require("./order/order.controller");
const shifts_controller_1 = require("./shifts/shifts.controller");
const shifts_service_1 = require("./shifts/shifts.service");
const vendor_service_1 = require("./vendor/vendor.service");
const vendor_controller_1 = require("./vendor/vendor.controller");
const vendor_module_1 = require("./vendor/vendor.module");
const recipe_module_1 = require("./recipe/recipe.module");
const shifts_module_1 = require("./shifts/shifts.module");
const order_module_1 = require("./order/order.module");
const organization_module_1 = require("./organization/organization.module");
const order_item_module_1 = require("./order-item/order-item.module");
const restaurant_module_1 = require("./restaurant/restaurant.module");
const logging_module_1 = require("./logging/logging.module");
const config_1 = require("@nestjs/config");
const env_module_1 = require("./env/env.module");
const env_1 = require("./env/env");
const recipe_controller_1 = require("./recipe/recipe.controller");
const recipe_service_1 = require("./recipe/recipe.service");
const encryption_service_1 = require("./helpers/encryption/encryption.service");
const encryption_module_1 = require("./helpers/encryption/encryption.module");
const prep_board_controller_1 = require("./prep-board/prep-board.controller");
const prep_board_module_1 = require("./prep-board/prep-board.module");
const auth_module_1 = require("./auth/auth.module");
const i18n_service_1 = require("./i18n/i18n.service");
const i18n_module_1 = require("./i18n/i18n.module");
const helpers_module_1 = require("./helpers/helpers.module");
const aws_module_1 = require("./helpers/aws/aws.module");
const early_access_module_1 = require("./early-access/early-access.module");
const analytics_module_1 = require("./analytics/analytics.module");
const menu_item_module_1 = require("./menu-item/menu-item.module");
const menu_module_1 = require("./menu/menu.module");
const inventory_management_module_1 = require("./inventory-management/inventory-management.module");
const ingredient_service_1 = require("./ingredient/ingredient.service");
const ingredient_controller_1 = require("./ingredient/ingredient.controller");
const ingredient_module_1 = require("./ingredient/ingredient.module");
const prep_item_service_1 = require("./prep-item/prep-item.service");
const prep_item_module_1 = require("./prep-item/prep-item.module");
const open_aiservice_service_1 = require("./open-aiservice/open-aiservice.service");
const aiassistant_service_1 = require("./aiassistant/aiassistant.service");
const aiassistant_controller_1 = require("./aiassistant/aiassistant.controller");
const aiassistant_module_1 = require("./aiassistant/aiassistant.module");
const throttler_1 = require("@nestjs/throttler");
const csrf_module_1 = require("./csrf/csrf.module");
const env_service_1 = require("./env/env.service");
const csrf_config_1 = require("./csrf/csrf.config");
const nutrition_service_service_1 = require("./nutrition-service/nutrition-service.service");
const nutrition_service_controller_1 = require("./nutrition-service/nutrition-service.controller");
const usda_api_service_1 = require("./usda-api/usda-api.service");
const nutrition_service_module_1 = require("./nutrition-service/nutrition-service.module");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const axios_1 = require("@nestjs/axios");
let AppModule = class AppModule {
    constructor(envService) {
        this.envService = envService;
    }
    configure(consumer) {
        const { doubleCsrfProtection } = (0, csrf_config_1.createCsrfUtilities)(this.envService);
        consumer.apply((0, cookie_parser_1.default)())
            .forRoutes('*');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                validate: (env) => env_1.envSchema.parse(env),
            }),
            throttler_1.ThrottlerModule.forRoot([{
                    ttl: 6000,
                    limit: 10
                }]),
            users_module_1.UsersModule,
            prisma_module_1.PrismaModule,
            vendor_module_1.VendorModule,
            recipe_module_1.RecipeModule,
            shifts_module_1.ShiftModule,
            order_module_1.OrderModule,
            organization_module_1.OrganizationModule,
            cookbook_module_1.CookBookModule,
            order_item_module_1.OrderItemModule,
            restaurant_module_1.RestaurantModule,
            logging_module_1.LoggingModule,
            env_module_1.EnvModule,
            encryption_module_1.EncryptionModule,
            prep_board_module_1.PrepBoardModule,
            auth_module_1.AuthModule,
            i18n_module_1.I18nModule,
            helpers_module_1.HelpersModule,
            aws_module_1.AwsModule,
            early_access_module_1.EarlyAccessModule,
            analytics_module_1.AnalyticsModule,
            menu_item_module_1.MenuItemModule,
            menu_module_1.MenuModule,
            inventory_management_module_1.InventoryManagementModule,
            ingredient_module_1.IngredientModule,
            prep_item_module_1.PrepItemModule,
            aiassistant_module_1.AiassistantModule,
            csrf_module_1.CsrfModule,
            nutrition_service_module_1.NutritionModule,
            axios_1.HttpModule
        ],
        controllers: [
            app_controller_1.AppController,
            organization_controller_1.OrganizationController,
            cookbook_controller_1.CookBookController,
            order_controller_1.OrderController,
            shifts_controller_1.ShiftController,
            vendor_controller_1.VendorController,
            recipe_controller_1.RecipeController,
            prep_board_controller_1.PrepBoardController,
            ingredient_controller_1.IngredientController,
            aiassistant_controller_1.AiassistantController,
            nutrition_service_controller_1.NutritionController,
        ],
        providers: [
            app_service_1.AppService,
            prisma_service_1.PrismaService,
            organization_service_1.OrganizationService,
            cookbook_service_1.CookBookService,
            order_service_1.OrderService,
            shifts_service_1.ShiftService,
            vendor_service_1.VendorService,
            recipe_service_1.RecipeService,
            encryption_service_1.EncryptionService,
            i18n_service_1.I18nService,
            ingredient_service_1.IngredientService,
            prep_item_service_1.PrepItemService,
            open_aiservice_service_1.OpenAiserviceService,
            aiassistant_service_1.AiassistantService,
            nutrition_service_service_1.NutritionService,
            usda_api_service_1.UsdaApiService,
        ],
    }),
    __metadata("design:paramtypes", [env_service_1.EnvService])
], AppModule);
//# sourceMappingURL=app.module.js.map