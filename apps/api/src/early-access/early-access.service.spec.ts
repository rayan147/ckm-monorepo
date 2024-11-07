import { Test, TestingModule } from '@nestjs/testing';
import { EarlyAccessService } from './early-access.service';

describe('EarlyAccessService', () => {
  let service: EarlyAccessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EarlyAccessService],
    }).compile();

    service = module.get<EarlyAccessService>(EarlyAccessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
