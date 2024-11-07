import { Test, TestingModule } from '@nestjs/testing';
import { PrepItemController } from './prep-item.controller';

describe('PrepItemController', () => {
  let controller: PrepItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrepItemController],
    }).compile();

    controller = module.get<PrepItemController>(PrepItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
