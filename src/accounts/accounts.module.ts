import { Module, forwardRef } from '@nestjs/common';
import { AsksModule } from 'src/asks/asks.module';
import { GivesModule } from 'src/gives/gives.module';
import { ThanksModule } from 'src/thanks/thanks.module';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';

@Module({
  controllers: [AccountsController],
  providers: [AccountsService],
  exports: [AccountsService],
  imports: [forwardRef(() => AsksModule), GivesModule, ThanksModule, GivesModule]
})
export class AccountsModule {}
