import { Module } from '@nestjs/common';
import { InventoryManagementController } from './inventory-management.controller';
import { InventoryManagementService } from './inventory-management.service';

@Module({
  controllers: [InventoryManagementController],
  providers: [InventoryManagementService],
})
export class InventoryManagementModule {}
