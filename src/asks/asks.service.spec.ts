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

  it('should create an ask with AID', () => {
    let testAsk = service.create(
      {
        uid: 0,
        aid: null,
        type: "gift",
        description: "This is a test gift",
        start_date: "2022-08-01",
        end_date: null,
        extra_zip: null,
        is_active: true,
        date_created: null
      }
    );
    expect(testAsk).toEqual(
      {
        uid: 0,
        aid: null,
        type: "gift",
        description: "This is a test gift",
        start_date: "2022-08-01",
        end_date: null,
        extra_zip: null,
        is_active: true,
        date_created: null
      });
  });
  it('should throw exception if duplicate', () => {
    let testAsk = 
    {
      uid: 0,
      aid: null,
      type: "gift",
      description: "This is a test gift",
      start_date: "2022-08-01",
      end_date: null,
      extra_zip: null,
      is_active: true,
      date_created: null
    };
    expect(() => service.create(testAsk)).toThrow('Throw ')
  })
});
