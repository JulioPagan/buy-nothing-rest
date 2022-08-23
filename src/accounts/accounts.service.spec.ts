import { Test, TestingModule } from '@nestjs/testing';
import { Account } from 'src/interfaces/account.interface';
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
    address: { street : '1234 test Ave', zip : '09123' },
    phone: '312-773-1234',
    picture: 'http://example.com/imagetest.com',
    is_active: false,
    date_created: null
  }


  let updatedAccount = {
    uid: null,
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
  });

  it('should create an account with UID', () => {
    let createdAccount = service.create(testAccount1);
    expect(createdAccount).toEqual(
      {
        uid: null,
        name: 'Mr. Test',
        address: { street : '1234 test Ave', zip : '09123' },
        phone: '312-773-1234',
        picture: 'http://example.com/imagetest.com',
        is_active: false,
        date_created: null
      });
  });


  it('should activate an account with UID', () => {
    let activatedAccount = service.activate(service.accounts[0].uid);
    expect(activatedAccount).toEqual(
      {
        uid: null,
        name: 'Mr. Test',
        address: { street : '1234 test Ave', zip : '09123' },
        phone: '312-773-1234',
        picture: 'http://example.com/imagetest.com',
        is_active: true,
        date_created: null
      });
  });


  it('should throw 400 if the accountDto is missing name ', () => {
    let testAccount = service.create(
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
    expect(testAccount).toEqual(
      {
        // throw 400 if no name
      });
  });

  it('should throw 400 if the accountDto is missing address zip', () => {
    let testAccount = service.create(
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
    expect(testAccount).toEqual(
      {
        // throw 400 if no zip
      });
  });
  it('should throw 400 if the accountDto is missing address address street', () => {
    let testAccount = service.create(
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
    expect(testAccount).toEqual(
      {
        // throw 400 if no street
      });
  });

  it('should throw 400 if the accountDto is missing phone', () => {
    let testAccount = service.create(
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
    expect(testAccount).toEqual(
      {
        // throw 400 if no phone 
      });
  });

  it('should throw 400 if the accountDto is missing picture', () => {
    let testAccount = service.create(
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
    expect(testAccount).toEqual(
      {
        // throw 400 if no picture 
      });
  });

  it('should throw 400 if the accountDto is creating active accont', () => {
    let testAccount = service.create(
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
    expect(testAccount).toEqual(
      {
        // throw 400 if account is created active by default 
      });
  });

  it('should throw 400 if the accountDto is pre-selecting a date_created', () => {
    let testAccount = service.create(
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
    expect(testAccount).toEqual(
      {
        // throw 400 if account is pre-selecting a date created 
      });
  });

  it('should throw 400 if the accountDto is pre-selecting a uid', () => {
    let testAccount = service.create(
      {
        uid: 7,
        name: 'Mr. Test',
        address: { street : '1234 test Ave', zip : '09123' },
        phone: '312-773-1234',
        picture: 'http://example.com/imagetest.com',
        is_active: false,
        date_created: null
      }
    );
    expect(testAccount).toEqual(
      {
        // throw 400 if account is pre-selecting a date created 
      });
  });


  it('should update the pre-existng account with new account', () => {
    service.update(service.accounts[0].uid, updatedAccount);
    expect(service.accounts[0]).toEqual(
      {
        uid: null,
        name: 'Mr. Updated',
        address: { street : '1234 test Ave', zip : '09123' },
        phone: '312-773-1234',
        picture: 'http://example.com/imagetest.com',
        is_active: false,
        date_created: null    
      });
  });


  it('should delete an account from the existing list of accounts', () => {
    let currentLength = service.accounts.length;
    service.delete(service.accounts[0].uid);
    let newLength = service.accounts.length;
    expect(newLength < currentLength).toEqual(true);
  });


  it('should create another account with UID', () => {
    let createdAccount = service.create(testAccount2);
    expect(createdAccount).toEqual(
      {
        uid: null,
        name: 'Mr. Created 2.0',
        address: { street : '1234 test Ave', zip : '09123' },
        phone: '312-773-1234',
        picture: 'http://example.com/imagetest.com',
        is_active: false,
        date_created: null
      });
  });


  it('should find all account in the existing list of accounts', () => {
    let allAccounts = service.findAll();
    expect(allAccounts == service.accounts).toEqual(true);
  });

});
