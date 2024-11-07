import { Test, TestingModule } from '@nestjs/testing';
import { PrepBoardService } from './prep-board.service';

describe('PrepBoardService', () => {
  let service: PrepBoardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrepBoardService],
    }).compile();

    service = module.get<PrepBoardService>(PrepBoardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
