import { Test, TestingModule } from '@nestjs/testing';
import { AsksService } from './asks.service';

describe('AsksService', () => {
  let service: AsksService;
  let testAsk1 = {
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
  let testAsk2 = {
    uid: 0,
    aid: null,
    type: "service",
    description: "This is a test service",
    start_date: "2022-08-01",
    end_date: null,
    extra_zip: null,
    is_active: true,
    date_created: null
  }
  let updatedAsk = {
    uid: 0,
    aid: null,
    type: "service",
    description: "This is an updated test service",
    start_date: "2022-08-01",
    end_date: null,
    extra_zip: null,
    is_active: true,
    date_created: null
  }


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AsksService],
    }).compile();

    service = module.get<AsksService>(AsksService);
  });

  it('should create an ask with AID', () => {
    let createdAsk = service.create(testAsk1);
    expect(createdAsk).toEqual(
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

  it('should throw exception if attempting too pre-set AID', () => {
    let attemptCreate = service.create({
      uid: 3,
      aid: null,
      type: "service",
      description: "This is a test service",
      start_date: "2022-08-01",
      end_date: null,
      extra_zip: null,
      is_active: true,
      date_created: null  
    });
    expect(attemptCreate).toEqual({
      // throw error when pre-selecting aid 
    })
  })

  // TO-DO: Test throwing errors when Request is BAD


  it('should deactivate an ask with AID', () => {
    let deactivatedAsk = service.deactivate(service.asks[0].uid, service.asks[0].aid);
    expect(deactivatedAsk.is_active).toEqual(false);
  });


  it('should update the pre-existng ask with new ask', () => {
    service.update(service.asks[0].uid, service.asks[0].aid, updatedAsk);
    expect(service.asks[0]).toEqual(updatedAsk);
  });


  it('should delete the ask identified by AID', () => {
    service.delete(service.asks[0].uid, service.asks[0].aid);
    expect(service.asks[0]).toEqual(updatedAsk);
  });
  
  it('should create an ask with AID', () => {
    let createdAsk = service.create(testAsk2);
    expect(createdAsk).toEqual(
      {
        uid: 0,
        aid: null,
        type: "service",
        description: "This is a test service",
        start_date: "2022-08-01",
        end_date: null,
        extra_zip: null,
        is_active: true,
        date_created: null
      });
  });


  // TO-DO: Test view my asks


  it('should find all asks in the existing list of asks when the user viewing them is CSR', () => {
    // User #2 is the Customer Service Representative (CSR)
    let allAsks = service.findAll(2);
    expect(allAsks == service.asks).toEqual(true);
  });


  it('should find one ask identified by the AID', () => {
    // User #2 is the Customer Service Representative (CSR)
    let firstAsk = service.findOne(0);
    expect(firstAsk == service.asks[0]).toEqual(true);
  });


  it('should find all asks that match search parameters', () => {
    let searchedAsks = service.searchAsks('is');
    expect(searchedAsks == service.asks.filter(ask => { 
      // TO-DO: Process s_date & e_date 
      let askDescription = ask.description.toLowerCase();
      let askType = ask.type.toLowerCase();
      return askDescription.includes('is'.toLowerCase()) || askType.includes('is'.toLowerCase())})).toEqual(true);
  });

});
