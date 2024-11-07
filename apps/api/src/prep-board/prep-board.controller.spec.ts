import { Test, TestingModule } from '@nestjs/testing';
import { PrepBoardController } from './prep-board.controller';

describe('PrepBoardController', () => {
  let controller: PrepBoardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrepBoardController],
    }).compile();

    controller = module.get<PrepBoardController>(PrepBoardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
