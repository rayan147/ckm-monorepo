import { Module } from '@nestjs/common';
import { PrepItemService } from './prep-item.service';
import { PrepItemController } from './prep-item.controller';

@Module({
  providers: [PrepItemService],
  controllers: [PrepItemController],
})
export class PrepItemModule {}
