import { Test, TestingModule } from '@nestjs/testing';
import { UsdaApiService } from './usda-api.service';

describe('UsdaApiService', () => {
  let service: UsdaApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsdaApiService],
    }).compile();

    service = module.get<UsdaApiService>(UsdaApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
