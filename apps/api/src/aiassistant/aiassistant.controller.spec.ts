import { Test, TestingModule } from '@nestjs/testing';
import { AiassistantController } from './aiassistant.controller';

describe('AiassistantController', () => {
  let controller: AiassistantController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AiassistantController],
    }).compile();

    controller = module.get<AiassistantController>(AiassistantController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
