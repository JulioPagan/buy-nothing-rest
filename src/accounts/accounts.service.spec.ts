import { BadRequestException, NotFoundException } from '@nestjs/common';
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
  let badUpdateAccount = {
    uid: 0,
    name: 'Mr. Updated',
    address: { street : '1234 test Ave', zip : '09123' },
    phone: '312-773-1234',
    picture: 'http://example.com/imagetest.com',
    is_active: true,
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
  // Test BAD Account Creation
  it('should throw 400 if the accountDto is pre-selecting a uid', () => {
    expect(() => {service.create({
      uid: 7,
      name: 'Mr. Test',
      address: { street : '1234 test Ave', zip : '09123' },
      phone: '312-773-1234',
      picture: 'http://example.com/imagetest.com',
      is_active: false,
      date_created: null
    })}).toThrow(BadRequestException);
  });
  // Test BAD Account Creation
  it('should throw 400 if the accountDto is missing name ', () => {
    expect(() => {service.create({
      uid: null,
      name: null,
      address: { street : '1234 test Ave', zip : '09123' },
      phone: '312-773-1234',
      picture: 'http://example.com/imagetest.com',
      is_active: false,
      date_created: null
    })}).toThrow(BadRequestException);
  });
  // Test BAD Account Creation
  it('should throw 400 if the accountDto is missing address zip', () => {
    expect(() => {service.create({
      uid: null,
      name: 'Mr. Test',
      address: { street : '1234 test Ave', zip : null },
      phone: '312-773-1234',
      picture: 'http://example.com/imagetest.com',
      is_active: false,
      date_created: null
    })}).toThrow(BadRequestException);
  });
  // Test BAD Account Creation
  it('should throw 400 if the accountDto is missing address address street', () => {
    expect(() => {service.create({
      uid: null,
      name: 'Mr. Test',
      address: { street : null, zip : '09123' },
      phone: '312-773-1234',
      picture: 'http://example.com/imagetest.com',
      is_active: false,
      date_created: null
    })}).toThrow(BadRequestException);
  });
  // Test BAD Account Creation
  it('should throw 400 if the accountDto is missing phone', () => {
    expect(() => {service.create({
      uid: null,
      name: 'Mr. Test',
      address: { street : '1234 test Ave', zip : '09123' },
      phone: null,
      picture: 'http://example.com/imagetest.com',
      is_active: false,
      date_created: null
    })}).toThrow(BadRequestException);
  });
  // Test BAD Account Creation
  it('should throw 400 if the accountDto is missing picture', () => {
    expect(() => {service.create({
      uid: null,
      name: 'Mr. Test',
      address: { street : '1234 test Ave', zip : '09123' },
      phone: '312-773-1234',
      picture: null,
      is_active: false,
      date_created: null
    })}).toThrow(BadRequestException);
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
    expect(() => {service.create({
      uid: null,
      name: 'Mr. Test',
      address: { street : '1234 test Ave', zip : '09123' },
      phone: '312-773-1234',
      picture: 'http://example.com/imagetest.com',
      is_active: false,
      date_created: '2022-03-12T17:12:26Z'
    })}).toThrow(BadRequestException);
  });
  

  // Test Activation
  it('should activate an account with UID', () => {
    let activatedAccount = service.activate(service.accounts[3].uid);
    expect(activatedAccount.is_active).toBeTruthy();
  });
  // BAD Activation
  it('should throw 400 if uid is not a number', () => {
    expect(() => {service.activate(null)}).toThrow(BadRequestException);
  });
  // BAD Activation
  it('should throw 404 if UID not found', () => {
    expect(() => {service.activate(8)}).toThrow(NotFoundException);
  });


  // Test Update
  it('should update the pre-existng account with new account', () => {
    let uid = service.accounts[0].uid;
    let date = service.accounts[0].date_created;
    service.update(service.accounts[0].uid, testUpdateAccount);
    expect(service.accounts[0]).toEqual(
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
  // BAD Update
  it('should throw 404 if the uid cannot be found', () => {
    expect(() => {service.update(9, testUpdateAccount)}).toThrow(NotFoundException);
  });
  // BAD Update
  it('should throw 400 if the update is trying to activate account', () => {
    expect(() => {service.update(1, badUpdateAccount)}).toThrow(BadRequestException);
  });


  // Test Delete
  it('should delete an account from the existing list', () => {
    let currentLength = service.accounts.length;
    service.delete(service.accounts[0].uid);
    let newLength = service.accounts.length;
    expect(newLength < currentLength).toBeTruthy();
  });  
  // && that UID doesn't exist anymore ^^^
  it('should delete the account identified by uid', () => {
    let preDelete = service.accounts[0];
    service.delete(service.accounts[0].uid);
    expect(preDelete == service.accounts[0]).toBeFalsy();
  });
  // BAD Delete
  it('should throw 404 if an account is not found to delete', () => {
    expect(() => {service.delete(7)}).toThrow(NotFoundException);
  });


  // Test findAll
  it('should find all account in the existing list of accounts', () => {
    let allAccounts = service.findAll();
    expect(allAccounts == service.accounts).toBeTruthy();
  });


  // Test findOne
  it('should find one account identified by the UID', () => {
    let firstAccount = service.findOne(0);
    expect(firstAccount == service.accounts[0]).toBeTruthy();
  });
  // BAD findOne
  it('should throw 404 if an account is not found with the specified UID', () => {
    expect(() => {service.findOne(8)}).toThrow(NotFoundException);
  });


  // Test Search by Keyword
  it('should find all account that match keyword', () => {
    let searchedAccounts = service.findAll('created');
    let filteredSearch = service.accounts.filter(account => { 
      let accountName = account.name.toLowerCase();
      let accountAddressStreet = account.address.street.toLowerCase();
      return accountName.includes('created'.toLowerCase()) || accountAddressStreet.includes('created'.toLowerCase()) || account.address.zip.includes('created') || account.phone.includes('created') });
    expect(searchedAccounts.join() == filteredSearch.join()).toBeTruthy();
  });
  // Test search by keyword and start_date
  it('should find all accounts that match keyword and after start date', () => {
    let start = new Date('31-Dec-2000');
    let searchedAccounts = service.findAll('created', start);
    let filteredSearch = service.accounts.filter(account => { 
      let accountName = account.name.toLowerCase();
      let accountAddressStreet = account.address.street.toLowerCase();
      return (accountName.includes('created'.toLowerCase()) || accountAddressStreet.includes('created'.toLowerCase()) || account.address.zip.includes('created') || account.phone.includes('created')) && ((account.date_created > start))});
    expect(searchedAccounts.join() == filteredSearch.join()).toBeTruthy();
  });
  // Test search by keyword and end_date
  it('should find all accounts that match keyword and before end date', () => {
    let end = new Date('31-Dec-2022')
    let searchedAccounts = service.findAll('created', null, end);
    let filteredSearch = service.accounts.filter(account => { 
      let accountName = account.name.toLowerCase();
      let accountAddressStreet = account.address.street.toLowerCase();
      return (accountName.includes('created'.toLowerCase()) || accountAddressStreet.includes('created'.toLowerCase()) || account.address.zip.includes('created') || account.phone.includes('created')) && (account.date_created < end)});
    expect(searchedAccounts.join() == filteredSearch.join()).toBeTruthy();
  });
  // Test search by keyword and date range
  it('should find all accounts that match keyword and between date range', () => {
    let start = new Date('31-Dec-2000');
    let end = new Date('31-Dec-2022')
    let searchedAccounts = service.findAll('created', start, end);
    let filteredSearch = service.accounts.filter(account => { 
      let accountName = account.name.toLowerCase();
      let accountAddressStreet = account.address.street.toLowerCase();
      return (accountName.includes('created'.toLowerCase()) || accountAddressStreet.includes('created'.toLowerCase()) || account.address.zip.includes('created') || account.phone.includes('created')) && ((account.date_created > start ) && (account.date_created < end))});
    expect(searchedAccounts.join() == filteredSearch.join()).toBeTruthy();
  });


});
