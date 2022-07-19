import { Test, TestingModule } from '@nestjs/testing';
import { AsksService } from './asks.service';

describe('AsksService', () => {
  let service: AsksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AsksService],
    }).compile();

    service = module.get<AsksService>(AsksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
