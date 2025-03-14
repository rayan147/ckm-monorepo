import { Module } from '@nestjs/common';
import { UsdaApiService } from 'src/usda-api/usda-api.service';
import { NutritionService } from './nutrition-service.service';
import { NutritionController } from './nutrition-service.controller';
import { HttpModule } from '@nestjs/axios';
import { EnvModule } from 'src/env/env.module';


@Module({
  imports: [HttpModule, EnvModule],
  providers: [NutritionService, UsdaApiService],
  controllers: [NutritionController],
  exports: [NutritionService]
})
export class NutritionModule { }
