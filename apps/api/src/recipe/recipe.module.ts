import { Module } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeController } from './recipe.controller';
import { PrismaService } from '../prisma/prisma.service';
import { LoggingModule } from '../logging/logging.module';
import { EncryptionModule } from '../helpers/encryption/encryption.module';
import { AwsModule } from 'src/helpers/aws/aws.module';
import { EnvModule } from 'src/env/env.module';
import { IngredientModule } from '../ingredient/ingredient.module';
import { MulterModule } from '@nestjs/platform-express';


@Module({
  imports: [
    MulterModule.register(),
    LoggingModule,
    EncryptionModule,
    AwsModule,
    EnvModule,
    IngredientModule,
  ],
  providers: [RecipeService, PrismaService],
  controllers: [RecipeController],
  exports: [RecipeService],
})
export class RecipeModule { }
