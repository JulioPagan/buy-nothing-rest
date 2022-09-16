import { Global, Module } from '@nestjs/common';
import { AccountsModule } from '../accounts/accounts.module';
import { AsksModule } from '../asks/asks.module';
import { GivesModule } from '../gives/gives.module';
import { NotesModule } from '../notes/notes.module';
import { ThanksModule } from '../thanks/thanks.module';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';

@Module({
  controllers: [ReportsController],
  providers: [ReportsService],
  exports: [ReportsService],
  imports: [AccountsModule, AsksModule, GivesModule, ThanksModule, NotesModule]
})
export class ReportsModule {}
