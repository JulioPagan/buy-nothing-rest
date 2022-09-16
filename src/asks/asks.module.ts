import { Module, forwardRef } from '@nestjs/common';
import { AccountsModule } from '../accounts/accounts.module';
import { AsksController } from './asks.controller';
import { AsksService } from './asks.service';

@Module({
  controllers: [AsksController],
  providers: [AsksService],
  exports: [AsksService],
  imports: [forwardRef(() => AccountsModule)]
})
export class AsksModule {}
