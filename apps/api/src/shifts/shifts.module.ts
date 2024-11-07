import { Module } from '@nestjs/common';
import { ShiftService } from './shifts.service';
import { ShiftController } from './shifts.controller';
import { PrismaService } from '../prisma/prisma.service';
import { LoggingModule } from '../logging/logging.module';

@Module({
  imports: [LoggingModule],
  providers: [ShiftService, PrismaService],
  controllers: [ShiftController],
  exports: [ShiftService],
})
export class ShiftModule {}
