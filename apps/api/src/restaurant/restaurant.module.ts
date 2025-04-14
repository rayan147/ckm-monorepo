import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantController } from './restaurant.controller';
import { OrganizationModule } from 'src/organization/organization.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [RestaurantService],
  controllers: [RestaurantController],
  imports: [OrganizationModule, AuthModule],
})
export class RestaurantModule {}
