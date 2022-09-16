import { Module, forwardRef } from '@nestjs/common';
import { AsksModule } from '../asks/asks.module';
import { GivesModule } from '../gives/gives.module';
import { ThanksModule } from '../thanks/thanks.module';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';

@Module({
  controllers: [AccountsController],
  providers: [AccountsService],
  exports: [AccountsService],
  imports: [forwardRef(() => AsksModule), GivesModule, ThanksModule, GivesModule]
})
export class AccountsModule {}
