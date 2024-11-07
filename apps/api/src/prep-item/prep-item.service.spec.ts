import { Test, TestingModule } from '@nestjs/testing';
import { PrepItemService } from './prep-item.service';

describe('PrepItemService', () => {
  let service: PrepItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrepItemService],
    }).compile();

    service = module.get<PrepItemService>(PrepItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
