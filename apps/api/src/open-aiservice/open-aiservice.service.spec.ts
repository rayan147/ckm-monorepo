import { Test, TestingModule } from '@nestjs/testing';
import { OpenAiserviceService } from './open-aiservice.service';

describe('OpenAiserviceService', () => {
  let service: OpenAiserviceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OpenAiserviceService],
    }).compile();

    service = module.get<OpenAiserviceService>(OpenAiserviceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
