import { HttpModule } from '@nestjs/axios';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { AiassistantController } from './aiassistant/aiassistant.controller';
import { AiassistantModule } from './aiassistant/aiassistant.module';
import { AiassistantService } from './aiassistant/aiassistant.service';
import { AnalyticsModule } from './analytics/analytics.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';
import { AuthModule } from './auth/auth.module';
import { SessionInitMiddleware } from './auth/auth.session.middleware.service';
import { CookBookController } from './cookbook/cookbook.controller';
import { CookBookModule } from './cookbook/cookbook.module';
import { CookBookService } from './cookbook/cookbook.service';
import { CsrfController } from './csrf/csrf.controller';
import { CsrfModule } from './csrf/csrf.module';
import { EarlyAccessModule } from './early-access/early-access.module';
import { envSchema } from './env/env';
import { EnvModule } from './env/env.module';
import { AwsModule } from './helpers/aws/aws.module';
import { EncryptionModule } from './helpers/encryption/encryption.module';
import { EncryptionService } from './helpers/encryption/encryption.service';
import { HelpersModule } from './helpers/helpers.module';
import { I18nModule } from './i18n/i18n.module';
import { I18nService } from './i18n/i18n.service';
import { IngredientController } from './ingredient/ingredient.controller';
import { IngredientModule } from './ingredient/ingredient.module';
import { IngredientService } from './ingredient/ingredient.service';
import { InventoryManagementModule } from './inventory-management/inventory-management.module';
import { LoggingModule } from './logging/logging.module';
import { MenuItemModule } from './menu-item/menu-item.module';
import { MenuModule } from './menu/menu.module';
import { NutritionController } from './nutrition-service/nutrition-service.controller';
import { NutritionModule } from './nutrition-service/nutrition-service.module';
import { NutritionService } from './nutrition-service/nutrition-service.service';
import { OpenAiserviceService } from './open-aiservice/open-aiservice.service';
import { OrderItemModule } from './order-item/order-item.module';
import { OrderController } from './order/order.controller';
import { OrderModule } from './order/order.module';
import { OrderService } from './order/order.service';
import { OrganizationController } from './organization/organization.controller';
import { OrganizationModule } from './organization/organization.module';
import { OrganizationService } from './organization/organization.service';
import { PrepBoardController } from './prep-board/prep-board.controller';
import { PrepBoardModule } from './prep-board/prep-board.module';
import { PrepItemModule } from './prep-item/prep-item.module';
import { PrepItemService } from './prep-item/prep-item.service';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { RecipeController } from './recipe/recipe.controller';
import { RecipeModule } from './recipe/recipe.module';
import { RecipeService } from './recipe/recipe.service';
import { RestaurantModule } from './restaurant/restaurant.module';
import { ShiftController } from './shifts/shifts.controller';
import { ShiftModule } from './shifts/shifts.module';
import { ShiftService } from './shifts/shifts.service';
import { UsdaApiService } from './usda-api/usda-api.service';
import { UsersModule } from './users/users.module';
import { VendorController } from './vendor/vendor.controller';
import { VendorModule } from './vendor/vendor.module';
import { VendorService } from './vendor/vendor.service';
import { CsrfMiddleware } from './csrf/csrf.middleware';
import { TsRestModule } from '@ts-rest/nest';
import { CsrfGuard } from './csrf/csrf.guard';
import { RoleGuard } from './guards/role.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: env => envSchema.parse(env),
    }),
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,
        limit: 3,
      },
      {
        name: 'medium',
        ttl: 10000,
        limit: 20,
      },
      {
        name: 'long',
        ttl: 60000,
        limit: 100,
      },
    ]),
    TsRestModule.register({
      isGlobal: true,
      jsonQuery: true,
      validateResponses: true,
    }),
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
    HttpModule,
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
    CsrfController,
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
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard
    }
    // {
    //   provide: APP_GUARD,
    //   useClass: CsrfGuard,
    // },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SessionInitMiddleware, CsrfMiddleware).forRoutes('*');
  }
}
