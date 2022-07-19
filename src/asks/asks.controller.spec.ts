import { Test, TestingModule } from '@nestjs/testing';
import { AsksController } from './asks.controller';

describe('AsksController', () => {
  let controller: AsksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AsksController],
    }).compile();

    controller = module.get<AsksController>(AsksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
