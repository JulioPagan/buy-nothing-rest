import { Module, forwardRef } from '@nestjs/common';
import { AccountsModule } from 'src/accounts/accounts.module';
import { GivesController } from './gives.controller';
import { GivesService } from './gives.service';

@Module({
  controllers: [GivesController],
  providers: [GivesService],
  exports: [GivesService],
  imports: [forwardRef(() => AccountsModule)]
})
export class GivesModule {}
