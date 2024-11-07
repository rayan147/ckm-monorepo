import { Test, TestingModule } from '@nestjs/testing';
import { InventoryManagementController } from './inventory-management.controller';

describe('InventoryManagementController', () => {
  let controller: InventoryManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InventoryManagementController],
    }).compile();

    controller = module.get<InventoryManagementController>(
      InventoryManagementController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
