import { Test, TestingModule } from '@nestjs/testing';
import { NotesService } from '../notes/notes.service';
import { AccountsService } from '../accounts/accounts.service';
import { AsksService } from '../asks/asks.service';
import { GivesService } from '../gives/gives.service';
import { ReportsService } from './reports.service';

describe('ReportsService', () => {
  let service: ReportsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReportsService, AccountsService, AsksService, GivesService, NotesService],
    }).compile();

    service = module.get<ReportsService>(ReportsService);
  });

  it('should return available reports', () => {
    let testReportsAvailable = service.findAvailable();
    expect(testReportsAvailable).toEqual(
      [{  
          rid: 1,
          name: 'Asks/gives broken down by zip'
        },{
          rid: 2,
          name: 'Asks/gives and communications for a user'
      }]
      );
  });

  it('should return reports by ZIP', () => {
    let testReportsAvailable = service.findAvailable();
    expect(testReportsAvailable).toEqual(
      {  
        // Return asks n gives by zip report
      }
      );
  });

  it('should return reports of COMMUNICATIONS', () => {
    let testReportsAvailable = service.findReport(1);
    expect(testReportsAvailable).toEqual(
      {  
        // Return communications report
      }
      );
  });


  it('should throw 400 (Bad Request) if the viewed_by_id is not a CSR, or otherwise the query string consists of data that doesnt make sense', () => {
    let testReportsAvailable = service.findAvailable();
    expect(testReportsAvailable).toEqual(
      [{  
          'rid': parseInt('1'),
          'name': 'Asks/gives broken down by zip'
        },{
          'rid': parseInt('2'),
          'name': 'Asks/gives and communications for a user'
      }]
      );
  });

  it('should throw 404 (Not Found) if [rid] doesnt exist, and/or created_by_id doesnt exist, and/or viewed_by_id doesnt exist.', () => {
    let testReportsAvailable = service.findAvailable();
    expect(testReportsAvailable).toEqual(
      [{  
          'rid': parseInt('1'),
          'name': 'Asks/gives broken down by zip'
        },{
          'rid': parseInt('2'),
          'name': 'Asks/gives and communications for a user'
      }]
      );
  });

  
});
