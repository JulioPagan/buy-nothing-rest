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

  it('should throw exception if attempting too pre-set tid', () => {
    let attemptCreate = service.createThank({
      uid: 0,
      tid: 5,
      thank_to: 0,
      description: "This is an attenpt to create thank",
      date_created: null,
      });
    expect(attemptCreate).toEqual({
      // throw error when pre-selecting tid 
    })
  })


  it('should update the pre-existng thank with new thank', () => {
    service.update(service.thanks[0].uid, service.thanks[0].tid, updatedThank);
    expect(service.thanks[0]).toEqual(updatedThank);
  });


  it('should create an thank with tid', () => {
    let createdThank = service.createThank(testThank2);
    expect(createdThank).toEqual(
      {
        uid: 0,
        tid: null,
        thank_to: 0,
        description: "This is a very grateful test thank",
        date_created: null,
      });
  });


  // TO-DO: Test finding my thanks


  it('should find all thanks in the existing list of thanks', () => {
    // User #2 is the Customer Service Representative (CSR)
    let allThanks = service.findAll();
    expect(allThanks == service.thanks).toEqual(true);
  });


  it('should find one thank identified by the TID', () => {
    // User #2 is the Customer Service Representative (CSR)
    let index = 0;
    let firstThank = service.findOne(index);
    expect(firstThank == service.thanks[index]).toEqual(true);
  });


  // Test finding thank for users


  it('should find all thanks that match search parameters', () => {
    let searchedThanks = service.searchThanks('is');
    expect(searchedThanks == service.thanks.filter(thank => { 
      // TO-DO: Process s_date & e_date 
      let thankDescription = thank.description.toLowerCase();
      return thankDescription.includes('is'.toLowerCase())})).toEqual(true);
  });



});
