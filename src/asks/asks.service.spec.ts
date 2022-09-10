import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AccountsService } from '../accounts/accounts.service';
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
  let testAskCreation = {
    uid: 0,
    aid: null,
    type: "service created",
    description: "This is a test creation service",
    start_date: "2022-08-01",
    end_date: null,
    extra_zip: null,
    is_active: true,
    date_created: null
  }
  let testUpdateAsk = {
    uid: 0,
    aid: 0,
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
      providers: [AsksService, AccountsService],
    }).compile();

    service = module.get<AsksService>(AsksService);
    service.create(testAsk1);
    service.create(testAsk2);
  });

  it('should create an ask with AID', () => {
    let createdAsk = service.create(testAskCreation);
    let aid = createdAsk.aid;
    let date = createdAsk.date_created;
    expect(createdAsk).toEqual(
      {
        uid: 0,
        aid: aid,
        type: "service created",
        description: "This is a test creation service",
        start_date: "2022-08-01",
        end_date: null,
        extra_zip: null,
        is_active: true,
        date_created: date
      });
  });


  it('should throw exception if attempting too pre-set AID', () => {
    expect(() => {service.create({
      uid: 3,
      aid: 6,
      type: "service",
      description: "This is a test service",
      start_date: "2022-08-01",
      end_date: null,
      extra_zip: null,
      is_active: true,
      date_created: null  
    })}).toThrow(BadRequestException);
  });

  // TO-DO: Test throwing errors when Request is BAD


  it('should deactivate an ask with AID', () => {
    let deactivatedAsk = service.deactivate(service.asks[0].uid, service.asks[0].aid);
    expect(deactivatedAsk.is_active).toEqual(false);
  });


  it('should update the pre-existng ask with new ask', () => {
    service.update(service.asks[0].uid, service.asks[0].aid, testUpdateAsk);
    let aid = service.asks[0].aid;
    let date = service.asks[0].date_created;
    expect(service.asks[0]).toEqual({
      uid: 0,
      aid: aid,
      type: "service",
      description: "This is an updated test service",
      start_date: "2022-08-01",
      end_date: null,
      extra_zip: null,
      is_active: true,
      date_created: date  
      });
  });


  it('should delete an asks from the existing list', () => {
    let currentLength = service.asks.length;
    service.delete(service.asks[0].uid, service.asks[0].aid);
    let newLength = service.asks.length;
    expect(newLength < currentLength).toBeTruthy();
  });
  // && that UID doesn't exist anymore ^^^
  it('should delete the ask identified by aid', () => {
    let preDelete = service.asks[0];
    service.delete(service.asks[0].uid, service.asks[0].aid);
    expect(preDelete == service.asks[0]).toBeFalsy();
  });


  // TO-DO: Test view my asks
  it('should find all "my" active asks', () => {
    let myAsks = service.asks.filter(ask => { 
      return (ask.uid == 1) && ask.is_active;
  });;
    expect(service.getMyAsks(1, 'true')).toEqual(myAsks);
  });


  // Test viewing as CSR
  it('should find all asks in the existing list of asks when the user viewing them is CSR', () => {
    // User #2 is the Customer Service Representative (CSR)
    let allAsks = service.findAll(2);
    expect(allAsks == service.asks).toBeTruthy();
  });

  // Test viewing as RU
  it('should find asks available to regular user in the existing list', () => {
    // User #2 is the Customer Service Representative (CSR)
    let ruAsks = service.findAll(0);
    let asksVby0 = service.asks.filter(ask => { 
      return (ask.uid == 0);
      });
    expect(ruAsks == asksVby0).toBeTruthy();
  });


  it('should find one ask identified by the AID', () => {
    // User #2 is the Customer Service Representative (CSR)
    let firstAsk = service.findOne(0);
    expect(firstAsk == service.asks[0]).toBeTruthy();
  });


  // Search asks by keyword
  it('should find all asks that match search parameters', () => {
    let searchedAsks = service.searchAsks('is');
    let searchResults = service.asks.filter(ask => { 
      let askDescription = ask.description.toLowerCase();
      let askType = ask.type.toLowerCase();
      return askDescription.includes('is'.toLowerCase()) || askType.includes('is'.toLowerCase())})
    expect(searchedAsks).toEqual(searchResults);
  });

  // Search asks by keyword and start_date
  it('should find all asks that match keyword and after start date', () => {
    let start = new Date('31-Dec-2000');
    let searchedAsks = service.searchAsks('created', start);
    let filteredSearch = service.asks.filter(ask => { 
      let askDescription = ask.description.toLowerCase();
      let askType = ask.type.toLowerCase();
      return (askDescription.includes('created'.toLowerCase()) || askType.includes('created'.toLowerCase()) ) && ((ask.date_created > start))});
    expect(searchedAsks.join() == filteredSearch.join()).toBeTruthy();
  });

  // Search asks by keyword and end_date
  it('should find all asks that match keyword and before end date', () => {
    let end = new Date('31-Dec-2030');
    let searchedAsks = service.searchAsks('created', end);
    let filteredSearch = service.asks.filter(ask => { 
      let askDescription = ask.description.toLowerCase();
      let askType = ask.type.toLowerCase();
      return (askDescription.includes('created'.toLowerCase()) || askType.includes('created'.toLowerCase()) ) && ((ask.date_created < end))});
    expect(searchedAsks.join() == filteredSearch.join()).toBeTruthy();
  });

  // Search asks by keyword and in between date range
  it('should find all asks that match keyword and between start and end date', () => {
    let start = new Date('31-Dec-2000');
    let end = new Date('31-Dec-2030');
    let searchedAsks = service.searchAsks('created', start, end);
    let filteredSearch = service.asks.filter(ask => { 
      let askDescription = ask.description.toLowerCase();
      let askType = ask.type.toLowerCase();
      return (askDescription.includes('created'.toLowerCase()) || askType.includes('created'.toLowerCase()) ) && ((ask.date_created > start)) && ((ask.date_created < end))});
    expect(searchedAsks.join() == filteredSearch.join()).toBeTruthy();
  });

});
