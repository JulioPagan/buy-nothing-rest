import { Test, TestingModule } from '@nestjs/testing';
import { ThanksService } from './thanks.service';

describe('ThanksService', () => {
  let service: ThanksService;

  let testThank1 = {
    uid: 0,
    tid: null,
    thank_to: 0,
    description: "This is a test thank",
    date_created: null,
  }
  let testThank2 = {
    uid: 0,
    tid: null,
    thank_to: 0,
    description: "This is a very grateful test thank",
    date_created: null,
  }
  let updatedThank = {
    uid: 0,
    tid: null,
    thank_to: 0,
    description: "This is an updated thank-you",
    date_created: null,
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ThanksService],
    }).compile();

    service = module.get<ThanksService>(ThanksService);
  });

  it('should create a thank with TID', () => {
    let createdThank = service.createThank(testThank1);
    expect(createdThank).toEqual(
      {
        uid: 0,
        tid: null,
        thank_to: 0,
        description: "This is a test thank",
        date_created: null,
      });
  });
});
