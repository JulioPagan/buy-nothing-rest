import { Global, Module } from '@nestjs/common';
import { ThanksController } from './thanks.controller';
import { ThanksService } from './thanks.service';

@Module({
  controllers: [ThanksController],
  providers: [ThanksService],
  exports: [ThanksService]
})
export class ThanksModule {}
