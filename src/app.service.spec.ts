import { Test, TestingModule } from "@nestjs/testing";
import { AccountsModule } from "./accounts/accounts.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AsksModule } from "./asks/asks.module";
import { GivesModule } from "./gives/gives.module";
import { NotesModule } from "./notes/notes.module";
import { ReportsModule } from "./reports/reports.module";
import { ThanksModule } from "./thanks/thanks.module";

describe('AppService', () => {
    //Testing SetUp
    let appService: AppService;
      //Compile and Initialize
      beforeEach(async () => {
          const module: TestingModule = await Test.createTestingModule({
              imports: [AccountsModule, AsksModule, GivesModule, ThanksModule, NotesModule, ReportsModule],
              controllers: [AppController],
              providers: [AppService],
          }).compile();
          appService = module.get<AppService>(AppService);
        });
        it('should be defined', () => {
          expect(appService).toBeDefined();
        });
        it('should give app greeting', () => {
          let greeting = 'Buy Nothing Rest API!';
          let launchResponse = appService.getHello();
          expect(greeting).toEqual(launchResponse);
        });
  });
  