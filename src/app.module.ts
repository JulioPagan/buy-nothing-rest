import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountsModule } from './accounts/accounts.module';
import { AsksModule } from './asks/asks.module';
import { GivesModule } from './gives/gives.module';
import { ThanksModule } from './thanks/thanks.module';
import { NotesModule } from './notes/notes.module';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [AccountsModule, AsksModule, GivesModule, ThanksModule, NotesModule, ReportsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
