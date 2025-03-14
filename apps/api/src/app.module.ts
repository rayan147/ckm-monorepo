import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { OrganizationController } from './organization/organization.controller';
import { OrganizationService } from './organization/organization.service';
import { CookBookController } from './cookbook/cookbook.controller';
import { CookBookModule } from './cookbook/cookbook.module';
import { CookBookService } from './cookbook/cookbook.service';
import { OrderService } from './order/order.service';
import { OrderController } from './order/order.controller';
import { ShiftController } from './shifts/shifts.controller';
import { ShiftService } from './shifts/shifts.service';
import { VendorService } from './vendor/vendor.service';
import { VendorController } from './vendor/vendor.controller';
import { VendorModule } from './vendor/vendor.module';
import { RecipeModule } from './recipe/recipe.module';
import { ShiftModule } from './shifts/shifts.module';
import { OrderModule } from './order/order.module';
import { OrganizationModule } from './organization/organization.module';
import { OrderItemModule } from './order-item/order-item.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { LoggingModule } from './logging/logging.module';
import { ConfigModule } from '@nestjs/config';
import { EnvModule } from './env/env.module';
import { envSchema } from './env/env';
import { RecipeController } from './recipe/recipe.controller';
import { RecipeService } from './recipe/recipe.service';
import { EncryptionService } from './helpers/encryption/encryption.service';
import { EncryptionModule } from './helpers/encryption/encryption.module';
import { PrepBoardController } from './prep-board/prep-board.controller';
import { PrepBoardModule } from './prep-board/prep-board.module';
import { AuthModule } from './auth/auth.module';
import { I18nService } from './i18n/i18n.service';
import { I18nModule } from './i18n/i18n.module';
import { HelpersModule } from './helpers/helpers.module';
import { AwsModule } from './helpers/aws/aws.module';
import { EarlyAccessModule } from './early-access/early-access.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { MenuItemModule } from './menu-item/menu-item.module';
import { MenuModule } from './menu/menu.module';
import { InventoryManagementModule } from './inventory-management/inventory-management.module';
import { IngredientService } from './ingredient/ingredient.service';
import { IngredientController } from './ingredient/ingredient.controller';
import { IngredientModule } from './ingredient/ingredient.module';
import { PrepItemService } from './prep-item/prep-item.service';
import { PrepItemModule } from './prep-item/prep-item.module';
import { OpenAiserviceService } from './open-aiservice/open-aiservice.service';
import { AiassistantService } from './aiassistant/aiassistant.service';
import { AiassistantController } from './aiassistant/aiassistant.controller';
import { AiassistantModule } from './aiassistant/aiassistant.module';
import { ThrottlerModule } from '@nestjs/throttler'
import { CsrfController } from './csrf/csrf.controller';
import { CsrfModule } from './csrf/csrf.module';
import { EnvService } from './env/env.service';
import { createCsrfUtilities } from './csrf/csrf.config';
import { NutritionService } from './nutrition-service/nutrition-service.service';
import { NutritionController } from './nutrition-service/nutrition-service.controller';
import { UsdaApiService } from './usda-api/usda-api.service';
import { NutritionModule } from './nutrition-service/nutrition-service.module';
import cookieParser from 'cookie-parser';
import { HttpModule } from '@nestjs/axios'


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (env) => envSchema.parse(env),
    }),
    ThrottlerModule.forRoot([{
      ttl: 6000,
      limit: 10
    }]),
    UsersModule,
    PrismaModule,
    VendorModule,
    RecipeModule,
    ShiftModule,
    OrderModule,
    OrganizationModule,
    CookBookModule,
    OrderItemModule,
    RestaurantModule,
    LoggingModule,
    EnvModule,
    EncryptionModule,
    PrepBoardModule,
    AuthModule,
    I18nModule,
    HelpersModule,
    AwsModule,
    EarlyAccessModule,
    AnalyticsModule,
    MenuItemModule,
    MenuModule,
    InventoryManagementModule,
    IngredientModule,
    PrepItemModule,
    AiassistantModule,
    CsrfModule,
    NutritionModule,
    HttpModule
  ],
  controllers: [
    AppController,
    OrganizationController,
    CookBookController,
    OrderController,
    ShiftController,
    VendorController,
    RecipeController,
    PrepBoardController,
    IngredientController,
    AiassistantController,
    NutritionController,
  ],
  providers: [
    AppService,
    PrismaService,
    OrganizationService,
    CookBookService,
    OrderService,
    ShiftService,
    VendorService,
    RecipeService,
    EncryptionService,
    I18nService,
    IngredientService,
    PrepItemService,
    OpenAiserviceService,
    AiassistantService,
    NutritionService,
    UsdaApiService,
  ],
})
export class AppModule {
  /**
   *
   */
  constructor(private envService: EnvService) { }
  configure(consumer: MiddlewareConsumer) {
    const { doubleCsrfProtection } = createCsrfUtilities(this.envService);

    consumer.apply(cookieParser())
      .forRoutes('*')
    // .apply(doubleCsrfProtection)
    // .exclude('csrf')
    // .forRoutes('*')


  }
}
