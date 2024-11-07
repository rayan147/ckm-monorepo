import { Module } from '@nestjs/common';
import { PrepBoardService } from './prep-board.service';
import { PrepBoardController } from './prep-board.controller';

@Module({
  providers: [PrepBoardService],
  controllers: [PrepBoardController],
  exports: [PrepBoardService],
})
export class PrepBoardModule {}
