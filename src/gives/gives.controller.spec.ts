import { Test, TestingModule } from '@nestjs/testing';
import { GivesController } from './gives.controller';

describe('GivesController', () => {
  let controller: GivesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GivesController],
    }).compile();

    controller = module.get<GivesController>(GivesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
