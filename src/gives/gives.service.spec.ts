import { Test, TestingModule } from '@nestjs/testing';
import { GivesService } from './gives.service';

describe('GivesService', () => {
  let service: GivesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GivesService],
    }).compile();

    service = module.get<GivesService>(GivesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
