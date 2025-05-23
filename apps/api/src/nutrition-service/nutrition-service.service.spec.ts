import { Test, TestingModule } from '@nestjs/testing';
import { NutritionService } from './nutrition-service.service';

describe('NutritionServiceService', () => {
  let service: NutritionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NutritionService],
    }).compile();

    service = module.get<NutritionService>(NutritionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
