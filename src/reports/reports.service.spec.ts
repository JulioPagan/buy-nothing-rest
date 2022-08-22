import { Test, TestingModule } from '@nestjs/testing';
import { ReportsService } from './reports.service';

describe('ReportsService', () => {
  let service: ReportsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReportsService],
    }).compile();

    service = module.get<ReportsService>(ReportsService);
  });

  it('should create a note with NID', () => {
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
