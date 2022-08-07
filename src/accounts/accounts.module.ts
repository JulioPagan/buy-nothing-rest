import { Module } from '@nestjs/common';
import { AsksModule } from 'src/asks/asks.module';
import { GivesModule } from 'src/gives/gives.module';
import { NotesModule } from 'src/notes/notes.module';
import { ReportsModule } from 'src/reports/reports.module';
import { ThanksModule } from 'src/thanks/thanks.module';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';

@Module({
  controllers: [AccountsController],
  providers: [AccountsService],
  imports: [AsksModule, GivesModule, ThanksModule, GivesModule, NotesModule, ReportsModule]
})
export class AccountsModule {
  
}
