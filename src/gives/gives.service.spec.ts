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
  let updatedGive = {
    uid: 0,
    gid: null,
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
  });

  it('should create a give with GID', () => {
    let createdGive = service.create(testGive1);
    expect(createdGive).toEqual(
      {
        uid: 0,
        gid: null,
        type: "gift",
        description: "This is a test gift",
        start_date: "2022-08-01",
        end_date: null,
        extra_zip: null,
        is_active: true,
        date_created: null
      });
  });

  it('should throw exception if attempting too pre-set gid', () => {
    let attemptCreate = service.create({
      uid: 3,
      gid: null,
      type: "service",
      description: "This is a test service",
      start_date: "2022-08-01",
      end_date: null,
      extra_zip: null,
      is_active: true,
      date_created: null
  
    });
    expect(attemptCreate).toEqual({
      // throw error when pre-selecting gid 
    })
  })

  // TO-DO: Test throwing errors when Request is BAD


  it('should deactivate a give with gid', () => {
    let deactivatedGive = service.deactivateGive(service.gives[0].uid, service.gives[0].gid);
    expect(deactivatedGive.is_active).toEqual(false);
  });


  it('should update the pre-existng give with new give', () => {
    service.update(service.gives[0].uid, service.gives[0].gid, updatedGive);
    expect(service.gives[0]).toEqual(updatedGive);
  });


  it('should delete the give identified by gid', () => {
    service.delete(service.gives[0].uid, service.gives[0].gid);
    expect(service.gives[0]).toEqual(updatedGive);
  });
  
  it('should create an give with gid', () => {
    let createdGive = service.create(testGive2);
    expect(createdGive).toEqual(
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


  // TO-DO: Test view my gives


  it('should find all gives in the existing list of gives when the user viewing them is CSR', () => {
    // User #2 is the Customer Service Representative (CSR)
    let allGives = service.findAll(2);
    expect(allGives == service.gives).toEqual(true);
  });


  it('should find one give identified by the gid', () => {
    // User #2 is the Customer Service Representative (CSR)
    let firstGive = service.findOne(0);
    expect(firstGive == service.gives[0]).toEqual(true);
  });


  it('should find all gives that match search parameters', () => {
    let searchedGives = service.searchGives('is');
    expect(searchedGives == service.gives.filter(give => { 
      // TO-DO: Process s_date & e_date 
      let giveDescription = give.description.toLowerCase();
      let giveType = give.type.toLowerCase();
      return giveDescription.includes('is'.toLowerCase()) || giveType.includes('is'.toLowerCase())})).toEqual(true);
  });

});
