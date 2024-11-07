import { Module } from '@nestjs/common';
import { MenuItemService } from './menu-item.service';
import { MenuItemController } from './menu-item.controller';
import { RecipeModule } from 'src/recipe/recipe.module';

@Module({
  providers: [MenuItemService],
  controllers: [MenuItemController],
  imports: [RecipeModule],
})
export class MenuItemModule {}
