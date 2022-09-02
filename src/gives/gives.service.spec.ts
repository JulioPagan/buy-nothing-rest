import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { GivesService } from './gives.service';

describe('AsksService', () => {
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
      providers: [GivesService],
    }).compile();

    service = module.get<GivesService>(GivesService);
    service.create(testGive1);
    service.create(testGive2);
  });

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

  // TO-DO: Test throwing errors when Request is BAD


  it('should deactivate a give with gid', () => {
    let deactivatedGive = service.deactivateGive(service.gives[0].uid, service.gives[0].gid);
    expect(deactivatedGive.is_active).toBeFalsy();
  });


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


  it('should delete the give identified by gid', () => {
    let preDelete = service.gives[0];
    service.delete(service.gives[0].uid, service.gives[0].gid);
    expect(preDelete == service.gives[0]).toBeFalsy();
  });
  

  // TO-DO: Test view my gives
  it('should find all "my" active gives', () => {
    let myGives = service.gives.filter(give => { 
      return (give.uid == 1) && give.is_active;
  });;
    expect(service.getMyGives(1, 'true')).toEqual(myGives);
  });


  it('should find all gives in the existing list of gives when the user viewing them is CSR', () => {
    // User #2 is the Customer Service Representative (CSR)
    let allGives = service.findAll(2);
    expect(allGives).toEqual(service.gives);
  });


  it('should find one give identified by the gid', () => {
    // User #2 is the Customer Service Representative (CSR)
    let firstGive = service.findOne(0);
    expect(firstGive).toEqual(service.gives[0]);
  });


  it('should find all gives that match search parameters', () => {
    let searchedGives = service.searchGives('is');
    let searchResults = service.gives.filter(give => { 
      // TO-DO: Process s_date & e_date 
      let giveDescription = give.description.toLowerCase();
      let giveType = give.type.toLowerCase();
      return giveDescription.includes('is'.toLowerCase()) || giveType.includes('is'.toLowerCase())})
    expect(searchedGives).toEqual(searchResults);
  });

});
