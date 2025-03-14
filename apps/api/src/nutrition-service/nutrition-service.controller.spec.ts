import { Test, TestingModule } from '@nestjs/testing';
import { NutritionServiceController } from './nutrition-service.controller';

describe('NutritionServiceController', () => {
  let controller: NutritionServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NutritionServiceController],
    }).compile();

    controller = module.get<NutritionServiceController>(NutritionServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
