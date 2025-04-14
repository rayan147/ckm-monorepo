import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { AuthModule } from '../auth/auth.module';
import { LoggingModule } from '../logging/logging.module';

@Module({
  imports: [AuthModule, LoggingModule],
  providers: [MenuService],
  controllers: [MenuController],
})
export class MenuModule {}
