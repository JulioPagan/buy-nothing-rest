import { Test, TestingModule } from '@nestjs/testing';
import { ThanksService } from './thanks.service';

describe('ThanksService', () => {
  let service: ThanksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ThanksService],
    }).compile();

    service = module.get<ThanksService>(ThanksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
