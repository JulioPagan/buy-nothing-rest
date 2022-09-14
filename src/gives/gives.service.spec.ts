import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AccountsService } from '../accounts/accounts.service';
import { GivesService } from './gives.service';

describe('GivesService', () => {
  let service: GivesService;
  let testGive1 = {
    uid: 0,
    gid: null,
    type: "gift",
    description: "This is a test gift",
    start_date: "2022-08-01",
    end_date: null,
    extra_zip: null,
    is_active: true,
    date_created: null
  }
  let testGive2 = {
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
  let testGiveCreation = {
    uid: 0,
    gid: null,
    type: "service",
    description: "This is a created service for the community",
    start_date: "2022-08-01",
    end_date: null,
    extra_zip: null,
    is_active: true,
    date_created: null
  }
  let testUpdateGive = {
    uid: 0,
    gid: 0,
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
      providers: [GivesService, AccountsService],
    }).compile();

    service = module.get<GivesService>(GivesService);
    service.create(testGive1);
    service.create(testGive2);
  });



  // Test create
  it('should create a give with GID', () => {
    let createdGive = service.create(testGiveCreation);
    let gid = createdGive.gid;
    let date = createdGive.date_created;
    expect(createdGive).toEqual(
      {
        uid: 0,
        gid: gid,
        type: "service",
        description: "This is a created service for the community",
        start_date: "2022-08-01",
        end_date: null,
        extra_zip: null,
        is_active: true,
        date_created: date
          });
  });
  // Test BAD create
  it('should throw exception if attempting too pre-set gid', () => {
    expect(() => {service.create({
      uid: 3,
      gid: 5,
      type: "service",
      description: "This is a test service",
      start_date: "2022-08-01",
      end_date: null,
      extra_zip: null,
      is_active: true,
      date_created: null
  
    })}).toThrow(BadRequestException);
  })
  // Test BAD create
  it('should throw exception if attempting too pre-set date_created', () => {
    expect(() => {service.create({
      uid: 3,
      gid: null,
      type: "service",
      description: "This is a test service",
      start_date: "2022-08-01",
      end_date: null,
      extra_zip: null,
      is_active: true,
      date_created: "2022-08-01"
  
    })}).toThrow(BadRequestException);
  })
  // Test BAD create
  it('should throw exception if uid is not specified', () => {
    expect(() => {service.create({
      uid: null,
      gid: null,
      type: "service",
      description: "This is a test service",
      start_date: "2022-08-01",
      end_date: null,
      extra_zip: null,
      is_active: true,
      date_created: null
  
    })}).toThrow(BadRequestException);
  })
  // Test BAD create
  it('should throw exception if type is not specified', () => {
    expect(() => {service.create({
      uid: 0,
      gid: null,
      type: null,
      description: "This is a test service",
      start_date: "2022-08-01",
      end_date: null,
      extra_zip: null,
      is_active: true,
      date_created: null
  
    })}).toThrow(BadRequestException);
  })
  // Test BAD create
  it('should throw exception if description is not specified', () => {
    expect(() => {service.create({
      uid: 0,
      gid: null,
      type: "service",
      description: null,
      start_date: "2022-08-01",
      end_date: null,
      extra_zip: null,
      is_active: true,
      date_created: null
  
    })}).toThrow(BadRequestException);
  })


  // Test deactivate
  it('should deactivate a give with gid', () => {
    let deactivatedGive = service.deactivateGive(service.gives[0].uid, service.gives[0].gid);
    expect(deactivatedGive.is_active).toBeFalsy();
  });
  // Test deactivate
  it('should throw error if gid not found', () => {
    expect(service.deactivateGive(0, 9)).toThrow(NotFoundException);
  });
  // Test deactivate
  it('should throw error if uid not found', () => {
    expect(() => {service.deactivateGive(9, 0)}).toThrow(NotFoundException);
  });


  // Test update
  it('should update the pre-existng give with new give', () => {
    service.update(service.gives[0].uid, service.gives[0].gid, testUpdateGive);
    let date = service.gives[0].date_created;
    expect(service.gives[0]).toEqual({
      uid: 0,
      gid: 0,
      type: "service",
      description: "This is an updated test service",
      start_date: "2022-08-01",
      end_date: null,
      extra_zip: null,
      is_active: true,
      date_created: date
    });
  });
  // Test BAD request 
  it('should throw error if GID not found', () => {
    expect(service.update(0, 9, testUpdateGive)).toThrow(NotFoundException);
  });
  // Test BAD request 
  it('should throw error if UID not found', () => {
    expect(service.update(9, 0, testUpdateGive)).toThrow(NotFoundException);
  });
  // Test BAD request 
  it('should throw 400 if trying to update inactive give', () => {
    expect(() => {
      service.deactivateGive(service.gives[0].uid, service.gives[0].gid)
      service.update(service.gives[0].uid, service.gives[0].gid, testUpdateGive)}).toThrow(NotFoundException);
  });


  // Test delete gives
  it('should delete the give identified by gid', () => {
    let preDelete = service.gives[0];
    service.delete(service.gives[0].uid, service.gives[0].gid);
    expect(preDelete == service.gives[0]).toBeFalsy();
  });
  // && that UID doesn't exist anymore ^^^
  it('should delete the give identified by gid', () => {
    let preDelete = service.gives[0];
    service.delete(service.gives[0].uid, service.gives[0].gid);
    expect(preDelete == service.gives[0]).toBeFalsy();
  });
  // Test BAD delete
  it('should to throw error if gid is not found', () => {
    expect(service.delete(0, 9)).toThrow(NotFoundException);
  });
  // Test BAD delete
  it('should to throw error if uid is not found', () => {
    expect(service.delete(9, 0)).toThrow(NotFoundException);
  });
  

  // TO-DO: Test view my gives
  it('should find all "my" active gives', () => {
    let myGives = service.gives.filter(give => { 
      return (give.uid == 1) && give.is_active;
  });
    expect(service.getMyGives(1, 'true')).toEqual(myGives);
  });
  // TO-DO: Test view my gives
  it('should find all "my" inactive gives', () => {
    let myGives = service.gives.filter(give => { 
      return (give.uid == 1) && give.is_active;
  });;
    expect(service.getMyGives(1, 'false')).toEqual(myGives);
  });
  // TO-DO: Test view my gives
  it('should find all "my" gives', () => {
    let myGives = service.gives.filter(give => { 
      return (give.uid == 1);
  });;
    expect(service.getMyGives(1)).toEqual(myGives);
  });
  // TO-DO: Test view my gives
  it('should throw error for invalid uid', () => {
    expect(service.getMyGives(null)).toThrow(NotFoundException);
  });


  // Test viewing as CSR
  it('should find all gives in the existing list of gives when the user viewing them is CSR', () => {
    // User #2 is the Customer Service Representative (CSR)
    let allGives = service.findAll(2);
    expect(allGives == service.gives).toBeTruthy();
  });
  // Test viewing as CSR
  it('should find all active gives in the existing list of gives when the user viewing them is CSR', () => {
    // User #2 is the Customer Service Representative (CSR)
    let activeGives = service.gives.filter(give => { 
      return give.is_active == true;
  });
    expect(service.findAll(2, 'true')).toEqual(activeGives);
  });
  // Test viewing as CSR
  it('should find all inactive gives in the existing list of gives when the user viewing them is CSR', () => {
    // User #2 is the Customer Service Representative (CSR)
    let inactiveGives = service.gives.filter(give => { 
      return give.is_active == false;
  });
    expect(service.findAll(2, 'false')).toEqual(inactiveGives);
  });  
  // Test viewing as RU
  it('should find gives visible to user', () => {
    // User #1 is a Regular User (RU)
    let visibleGives = service.findAll(1);
    expect(() => {service.findAll(1)}).toEqual(visibleGives);
  });
  // BAD request with no user specified
  it('should throw error if no user is specified', () => {
    expect(() => {service.findAll(null)}).toThrow(BadRequestException);
  });


  // Test findOne
  it('should find one give identified by the gid', () => {
    let firstGive = service.findOne(0);
    expect(firstGive).toEqual(service.gives[0]);
  });
  // Test BAD findOne
  it('should throw 404 error if give not found', () => {
    expect(() => {service.findOne(9)}).toThrow(NotFoundException);
  });


  // Open search
  it('should find all gives', () => {
    let searchResults = service.gives;
    expect(service.searchGives()).toEqual(searchResults);
  });
  // Test search parameters
  it('should find all gives that match keyword', () => {
    let searchedGives = service.searchGives('is');
    let searchResults = service.gives.filter(give => { 
      // TO-DO: Process s_date & e_date 
      let giveDescription = give.description.toLowerCase();
      let giveType = give.type.toLowerCase();
      return giveDescription.includes('is'.toLowerCase()) || giveType.includes('is'.toLowerCase())})
    expect(searchedGives).toEqual(searchResults);
  });
  // Search gives by keyword and start_date
  it('should find all gives that match keyword and after start date', () => {
    let start = new Date('31-Dec-2000');
    let searchedGives = service.searchGives('created', start);
    let filteredSearch = service.gives.filter(give => { 
      let giveDescription = give.description.toLowerCase();
      let giveType = give.type.toLowerCase();
      return (giveDescription.includes('created'.toLowerCase()) || giveType.includes('created'.toLowerCase()) ) && ((give.date_created > start))});
    expect(searchedGives.join() == filteredSearch.join()).toBeTruthy();
  });
  // Search gives by keyword and end_date
  it('should find all gives that match keyword and before end date', () => {
    let end = new Date('31-Dec-2030');
    let searchedGives = service.searchGives('created', null, end);
    let filteredSearch = service.gives.filter(give => { 
      let giveDescription = give.description.toLowerCase();
      let giveType = give.type.toLowerCase();
      return (giveDescription.includes('created'.toLowerCase()) || giveType.includes('created'.toLowerCase()) ) && ((give.date_created < end))});
    expect(searchedGives.join() == filteredSearch.join()).toBeTruthy();
  });
  // Search gives by keyword and in between date range
  it('should find all gives that match keyword and between start and end date', () => {
    let start = new Date('31-Dec-2000');
    let end = new Date('31-Dec-2030');
    let searchedGives = service.searchGives('created', start, end);
    let filteredSearch = service.gives.filter(give => { 
      let giveDescription = give.description.toLowerCase();
      let giveType = give.type.toLowerCase();
      return (giveDescription.includes('created'.toLowerCase()) || giveType.includes('created'.toLowerCase()) ) && ((give.date_created > start)) && ((give.date_created < end))});
    expect(searchedGives.join() == filteredSearch.join()).toBeTruthy();
  });
  
});
