import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AccountsService } from './accounts.service';

describe('AccountsService', () => {
  let service: AccountsService;

  let testAccount1 = {
    uid: null,
    name: 'Mr. Created',
    address: { street : '1234 test Ave', zip : '09123' },
    phone: '312-773-1234',
    picture: 'http://example.com/imagetest.com',
    is_active: false,
    date_created: null
  }

  let testAccount2 = {
    uid: null,
    name: 'Mr. Created 2.0',
    address: { street : '4321 test Ave', zip : '09321' },
    phone: '312-773-1234',
    picture: 'http://example.com/imagetest.com',
    is_active: false,
    date_created: null
  }
  let testAccountCreation = {
    uid: null,
    name: 'Tested Creation',
    address: { street : '5678 test Ave', zip : '09567' },
    phone: '312-773-1234',
    picture: 'http://example.com/imagetest.com',
    is_active: false,
    date_created: null
  }
  let testUpdateAccount = {
    uid: 0,
    name: 'Mr. Updated',
    address: { street : '1234 test Ave', zip : '09123' },
    phone: '312-773-1234',
    picture: 'http://example.com/imagetest.com',
    is_active: false,
    date_created: null
  }


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountsService],
    }).compile();

    service = module.get<AccountsService>(AccountsService);
    service.create(testAccount1);
    service.create(testAccount2);
    
  });


  // Test Creation
  it('should create an account with UID', () => {
    let createdAccount = service.create(testAccountCreation);
    let uid = createdAccount.uid;
    let date = createdAccount.date_created;
    expect(createdAccount).toEqual(
      {
        uid: uid,
        name: 'Tested Creation',
        address: { street : '5678 test Ave', zip : '09567' },
        phone: '312-773-1234',
        picture: 'http://example.com/imagetest.com',
        is_active: false,
        date_created: date
      });
  });


  // Test Activation
  it('should activate an account with UID', () => {
    let activatedAccount = service.activate(service.accounts[3].uid);
    expect(activatedAccount.is_active).toEqual(true);
  });

  
  // Test BAD Account Creation
  it('should throw 400 if the accountDto is pre-selecting a uid', () => {
    let attemptCreate = 
      {
        uid: 7,
        name: 'Mr. Test',
        address: { street : '1234 test Ave', zip : '09123' },
        phone: '312-773-1234',
        picture: 'http://example.com/imagetest.com',
        is_active: false,
        date_created: null
      };
    expect(() => {service.create(attemptCreate)}).toThrow(BadRequestException);
  });
  // Test BAD Account Creation
  it('should throw 400 if the accountDto is missing name ', () => {
    let attemptCreate = service.create(
      {
        uid: null,
        name: null,
        address: { street : '1234 test Ave', zip : '09123' },
        phone: '312-773-1234',
        picture: 'http://example.com/imagetest.com',
        is_active: false,
        date_created: null
      }
    );
    expect(() => {service.create(attemptCreate)}).toThrow(BadRequestException);
  });
  // Test BAD Account Creation
  it('should throw 400 if the accountDto is missing address zip', () => {
    let attemptCreate = service.create(
      {
        uid: null,
        name: 'Mr. Test',
        address: { street : '1234 test Ave', zip : null },
        phone: '312-773-1234',
        picture: 'http://example.com/imagetest.com',
        is_active: false,
        date_created: null
      }
    );
    expect(() => {service.create(attemptCreate)}).toThrow(BadRequestException);
  });
  // Test BAD Account Creation
  it('should throw 400 if the accountDto is missing address address street', () => {
    let attemptCreate = service.create(
      {
        uid: null,
        name: 'Mr. Test',
        address: { street : null, zip : '09123' },
        phone: '312-773-1234',
        picture: 'http://example.com/imagetest.com',
        is_active: false,
        date_created: null
      }
    );
    expect(() => {service.create(attemptCreate)}).toThrow(BadRequestException);
  });
  // Test BAD Account Creation
  it('should throw 400 if the accountDto is missing phone', () => {
    let attemptCreate = service.create(
      {
        uid: null,
        name: 'Mr. Test',
        address: { street : '1234 test Ave', zip : '09123' },
        phone: null,
        picture: 'http://example.com/imagetest.com',
        is_active: false,
        date_created: null
      }
    );
    expect(() => {service.create(attemptCreate)}).toThrow(BadRequestException);
  });
  // Test BAD Account Creation
  it('should throw 400 if the accountDto is missing picture', () => {
    let attemptCreate = service.create(
      {
        uid: null,
        name: 'Mr. Test',
        address: { street : '1234 test Ave', zip : '09123' },
        phone: '312-773-1234',
        picture: null,
        is_active: false,
        date_created: null
      }
    );
    expect(() => {service.create(attemptCreate)}).toThrow(BadRequestException);
  });
  // Test BAD Account Creation
  it('should throw 400 if the accountDto is creating active accont', () => {
    let attemptCreate = service.create(
      {
        uid: null,
        name: 'Mr. Test',
        address: { street : '1234 test Ave', zip : '09123' },
        phone: '312-773-1234',
        picture: 'http://example.com/imagetest.com',
        is_active: true,
        date_created: null
      }
    );
    expect(() => {service.create(attemptCreate)}).toThrow(BadRequestException);
  });
  // Test BAD Account Creation
  it('should throw 400 if the accountDto is pre-selecting a date_created', () => {
    let attemptCreate = service.create(
      {
        uid: null,
        name: 'Mr. Test',
        address: { street : '1234 test Ave', zip : '09123' },
        phone: '312-773-1234',
        picture: 'http://example.com/imagetest.com',
        is_active: false,
        date_created: '2022-03-12T17:12:26Z'
      }
    );
    expect(() => {service.create(attemptCreate)}).toThrow(BadRequestException);
  });


  // Test Update
  it('should update the pre-existng account with new account', () => {
    let uid = service.accounts[0].uid;
    let date = service.accounts[0].date_created;
    let updatedAccount = service.update(service.accounts[0].uid, testUpdateAccount);
    expect(updatedAccount).toEqual(
      {
        uid: uid,
        name: 'Mr. Updated',
        address: { street : '1234 test Ave', zip : '09123' },
        phone: '312-773-1234',
        picture: 'http://example.com/imagetest.com',
        is_active: false,
        date_created: date    
      });
  });


  // Test Delete
  it('should delete an account from the existing list of accounts', () => {
    let currentLength = service.accounts.length;
    service.delete(service.accounts[0].uid);
    let newLength = service.accounts.length;
    expect(newLength < currentLength).toEqual(true);
  });


  // Test findAll
  it('should find all account in the existing list of accounts', () => {
    let allAccounts = service.findAll();
    expect(allAccounts == service.accounts).toEqual(true);
  });


  // Test findOne
  it('should find one account identified by the UID', () => {
    let firstAccount = service.findOne(0);
    expect(firstAccount == service.accounts[0]).toEqual(true);
  });


  // Test Search by Keyword
  it('should find all account that match search parameters', () => {
    let searchedAccounts = service.findAll('created');
    let filteredSearch = service.accounts.filter(account => { 
      let accountName = account.name.toLowerCase();
      let accountAddressStreet = account.address.street.toLowerCase();
      return accountName.includes('created'.toLowerCase()) || accountAddressStreet.includes('created'.toLowerCase()) || account.address.zip.includes('created') || account.phone.includes('created') });
    expect(searchedAccounts.join() == filteredSearch.join()).toEqual(true);
  });

  // Test search by keyword and start_date

  // Test search by keyword and end_date

  // Test search by keyword and date range


});
