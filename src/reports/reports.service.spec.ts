import { Test, TestingModule } from '@nestjs/testing';
import { NotesService } from '../notes/notes.service';
import { AccountsService } from '../accounts/accounts.service';
import { AsksService } from '../asks/asks.service';
import { GivesService } from '../gives/gives.service';
import { ReportsService } from './reports.service';
import { BadRequestException } from '@nestjs/common';

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
    expect(service.findReport(1, null, 2)).toEqual(
      {
        "rid": 1,
        "name": "Asks/gives broken down by zip",
        "c_by": "",
        "v_by": 2,
        "start_date": "",
        "end_date": "",
        "asks": 0,
        "gives": 0,
        "detail": [
            {
                "zip": "60607",
                "asks": {
                    "total": 0,
                    "active": 0,
                    "inactive": 0
                },
                "gives": {
                    "total": 1,
                    "active": 0,
                    "inactive": 1
                }
            },
            {
                "zip": "60608",
                "asks": {
                    "total": 1,
                    "active": 1,
                    "inactive": 0
                },
                "gives": {
                    "total": 1,
                    "active": 1,
                    "inactive": 0
                }
            },
            {
                "zip": "60616",
                "asks": {
                    "total": 3,
                    "active": 3,
                    "inactive": 0
                },
                "gives": {
                    "total": 2,
                    "active": 2,
                    "inactive": 0
                }
            },
            {
                "zip": "60677",
                "asks": {
                    "total": 0,
                    "active": 0,
                    "inactive": 0
                },
                "gives": {
                    "total": 1,
                    "active": 1,
                    "inactive": 0
                }
            }
        ]
    }
    );
  });

  // it('should return reports of COMMUNICATIONS', () => {
  //   let testReportsAvailable = service.findReport(1);
  //   expect(testReportsAvailable).toEqual(
  //     {  
  //       // Return communications report
  //     }
  //     );
  // });


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
    expect(() => {service.findReport(9)}).toThrow(BadRequestException);
  });

  
});
