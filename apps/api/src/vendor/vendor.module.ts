import { Module } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { VendorController } from './vendor.controller';
import { PrismaService } from '../prisma/prisma.service';
import { LoggingService } from '../logging/logging.service';

@Module({
  providers: [VendorService, PrismaService, LoggingService],
  controllers: [VendorController],
  exports: [VendorService],
})
export class VendorModule {}
