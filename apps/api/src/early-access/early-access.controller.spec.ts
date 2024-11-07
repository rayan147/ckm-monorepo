import { Test, TestingModule } from '@nestjs/testing';
import { EarlyAccessController } from './early-access.controller';

describe('EarlyAccessController', () => {
  let controller: EarlyAccessController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EarlyAccessController],
    }).compile();

    controller = module.get<EarlyAccessController>(EarlyAccessController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
