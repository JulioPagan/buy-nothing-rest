import { Test, TestingModule } from '@nestjs/testing';
import { ThanksController } from './thanks.controller';

describe('ThanksController', () => {
  let controller: ThanksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ThanksController],
    }).compile();

    controller = module.get<ThanksController>(ThanksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
