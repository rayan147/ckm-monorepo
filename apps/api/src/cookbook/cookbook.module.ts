import { Module } from '@nestjs/common';
import { CookBookService } from './cookbook.service';
import { CookBookController } from './cookbook.controller';

@Module({
  providers: [CookBookService],
  controllers: [CookBookController],
})
export class CookBookModule {}
