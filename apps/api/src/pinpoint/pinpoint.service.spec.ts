import { Test, TestingModule } from '@nestjs/testing';
import { PinpointService } from './pinpoint.service';

describe('PinpointService', () => {
  let service: PinpointService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PinpointService],
    }).compile();

    service = module.get<PinpointService>(PinpointService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
