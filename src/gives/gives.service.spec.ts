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

  it('should create a give with GID', () => {
    let testGive = service.create(
      {
        uid: 0,
        gid: null,
        type: "service",
        description: "This is a test service",
        start_date: "2022-08-01",
        end_date: null,
        extra_zip: null,
        is_active: true,
        date_created: null
      }
    );
    expect(testGive).toEqual(
      {
        uid: 0,
        gid: null,
        type: "service",
        description: "This is a test service",
        start_date: "2022-08-01",
        end_date: null,
        extra_zip: null,
        is_active: true,
        date_created: null
      });
  });
});
