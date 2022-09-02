import { Global, Module } from '@nestjs/common';
import { AccountsModule } from 'src/accounts/accounts.module';
import { AsksModule } from 'src/asks/asks.module';
import { GivesModule } from 'src/gives/gives.module';
import { NotesModule } from 'src/notes/notes.module';
import { ThanksModule } from 'src/thanks/thanks.module';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';

@Module({
  controllers: [ReportsController],
  providers: [ReportsService],
  exports: [ReportsService],
  imports: [AsksModule, GivesModule, ThanksModule, NotesModule]
})
export class ReportsModule {}
