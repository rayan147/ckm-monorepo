import { Test, TestingModule } from '@nestjs/testing';
import { AiassistantService } from './aiassistant.service';

describe('AiassistantService', () => {
  let service: AiassistantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AiassistantService],
    }).compile();

    service = module.get<AiassistantService>(AiassistantService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
