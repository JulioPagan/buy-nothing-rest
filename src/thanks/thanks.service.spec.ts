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

  it('should create a thank with TID', () => {
    let testThank = service.createThank(
      {
        uid: 0,
        tid: null,
        thank_to: 1,
        description: 'This is a test Thank',
        date_created: null
      }
    );
    expect(testThank).toEqual(
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
