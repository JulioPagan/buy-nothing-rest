import { BadRequestException, NotFoundException } from '@nestjs/common';
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
  let testThankCreation = {
    uid: 0,
    tid: null,
    thank_to: 0,
    description: "This is a creation test thank",
    date_created: null,
  }

  let updatedThank = {
    uid: 0,
    tid: 0,
    thank_to: 0,
    description: "This is an updated thank-you",
    date_created: null,
  }



  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ThanksService],
    }).compile();

    service = module.get<ThanksService>(ThanksService);
    service.createThank(testThank1);
    service.createThank(testThank2);
  });



  // Test create
  it('should create a thank with TID', () => {
    let createdThank = service.createThank(testThankCreation);
    let tid = createdThank.tid;
    let date = createdThank.date_created;
    expect(createdThank).toEqual(
      {
        uid: 0,
        tid: tid,
        thank_to: 0,
        description: "This is a creation test thank",
        date_created: date,
      });
  });
  // Test BAD request when pre-setting TID
  it('should throw BAD REQUEST if attempting too pre-set tid', () => {
      expect(() => {service.createThank({
        uid: 0,
        tid: 5,
        thank_to: 0,
        description: "This is an attempt to create thank",
        date_created: null,
        })}).toThrow(BadRequestException);
    })
  // Test BAD request when pre-setting date_createddd
  it('should throw BAD REQUEST if attempting too pre-set date_created', () => {
    expect(() => {service.createThank({
      uid: 0,
      tid: null,
      thank_to: 0,
      description: "This is an attempt to create thank",
      date_created: '2022-03-12T17:12:26Z',
      })}).toThrow(BadRequestException);
  })
  // Test BAD request when missing uid
  it('should throw BAD REQUEST if attempting too pre-set date_created', () => {
    expect(() => {service.createThank({
      uid: null,
      tid: null,
      thank_to: 0,
      description: "This is an attempt to create thank",
      date_created: null,
      })}).toThrow(BadRequestException);
  })
  // Test BAD request when missing thank_to
  it('should throw BAD REQUEST if missing thank_to', () => {
    expect(() => {service.createThank({
      uid: 0,
      tid: null,
      thank_to: null,
      description: "This is an attempt to create thank",
      date_created: null,
      })}).toThrow(BadRequestException);
  })
  // Test BAD request when missing description
  it('should throw BAD REQUEST if missing description', () => {
    expect(() => {service.createThank({
      uid: 0,
      tid: null,
      thank_to: 0,
      description: null,
      date_created: null,
      })}).toThrow(BadRequestException);
  })

  
  // Test update
  it('should update the pre-existng thank with new thank', () => {
    service.update(service.thanks[0].uid, service.thanks[0].tid, updatedThank);
    expect(service.thanks[0]).toEqual(updatedThank);
  });
  // Test BAD update
  it('should throw 404 if TID not found', () => {
    expect(() => {service.update(0, 9, updatedThank)}).toThrow(NotFoundException);
  });
  // Test BAD update
  it('should throw 404 if UID not found', () => {
    expect(() => {service.update(9, 0, updatedThank)}).toThrow(NotFoundException);
  });

  
  // Test get my thanks
  it('should find all "my" active thanks', () => {
    let myThanks = service.thanks.filter(thank => { 
      return (thank.uid == 1);
  });;
    expect(service.getMyThanks(1)).toEqual(myThanks);
  });
  // Test Bad get request
  it('should throw 404 if uid not found', () => {
    expect(() => {service.getMyThanks(null)}).toThrow(NotFoundException);
  });


  // Test find all
  it('should find all thanks in the existing list of thanks', () => {
    // User #2 is the Customer Service Representative (CSR)
    let allThanks = service.findAll();
    expect(allThanks == service.thanks).toBeTruthy();
  });

  // Test findOne
  it('should find one thank identified by the TID', () => {
    // User #2 is the Customer Service Representative (CSR)
    let index = 0;
    let firstThank = service.findOne(index);
    expect(firstThank == service.thanks[index]).toBeTruthy();
  });
  // Test BAD findOne
  it('should throw 404 if TID not found', () => {
    expect(() => {service.findOne(null)}).toThrow(NotFoundException);
  });


  // Test findAllForUser
  it('should find thanks for user', () => {
    let date = service.thanks[0].date_created;
    let date2 = service.thanks[1].date_created;
    expect(service.findAllForUser(0)).toEqual(
      [{    
        uid: 0,
        tid: 0,
        thank_to: 0,
        description: "This is a test thank",
        date_created: date,
      },{
        uid: 0,
        tid: 1,
        thank_to: 0,
        description: "This is a very grateful test thank",
        date_created: date2,    
      }]
    );
  });
  // Test findAllForUser
  it('should throw 404 if no thanks for user found', () => {
    expect(() => {service.findAllForUser(null)}).toThrow(NotFoundException);
  });


  // Test Search
  it('should find all thanks that match keyword', () => {
    let searchResults = service.thanks
    expect(service.searchThanks()).toEqual(searchResults);
  });
  // Test Search by keyword
  it('should find all thanks that match keyword', () => {
    let searchedThanks = service.searchThanks('is');
    let searchResults = service.thanks.filter(thank => { 
      // TO-DO: Process s_date & e_date 
      let thankDescription = thank.description.toLowerCase();
      return thankDescription.includes('is'.toLowerCase())})
    expect(searchedThanks).toEqual(searchResults);
  });
  // Search thanks by keyword and start_date
  it('should find all thanks that match keyword and after start date', () => {
    let start = new Date('31-Dec-2000');
    let searchedThanks = service.searchThanks('created', start);
    let filteredSearch = service.thanks.filter(thank => { 
      let thankDescription = thank.description.toLowerCase();
      return (thankDescription.includes('created'.toLowerCase())) && ((thank.date_created > start))});
    expect(searchedThanks.join() == filteredSearch.join()).toBeTruthy();
  });
  // Search thanks by keyword and end_date
  it('should find all thanks that match keyword and before end date', () => {
    let end = new Date('31-Dec-2030');
    let searchedThanks = service.searchThanks('created', null, end);
    let filteredSearch = service.thanks.filter(thank => { 
      let thankDescription = thank.description.toLowerCase();
      return (thankDescription.includes('created'.toLowerCase()) ) && ((thank.date_created < end))});
    expect(searchedThanks.join() == filteredSearch.join()).toBeTruthy();
  });
  // Search thanks by keyword and in between date range
  it('should find all thanks that match keyword and between start and end date', () => {
    let start = new Date('31-Dec-2000');
    let end = new Date('31-Dec-2030');
    let searchedThanks = service.searchThanks('created', start, end);
    let filteredSearch = service.thanks.filter(thank => { 
      let thankDescription = thank.description.toLowerCase();
      return (thankDescription.includes('created'.toLowerCase()) ) && ((thank.date_created > start)) && ((thank.date_created < end))});
    expect(searchedThanks.join() == filteredSearch.join()).toBeTruthy();
  });


});
