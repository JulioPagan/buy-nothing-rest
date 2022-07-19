import { Module } from '@nestjs/common';
import { ThanksController } from './thanks.controller';
import { ThanksService } from './thanks.service';

@Module({
  controllers: [ThanksController],
  providers: [ThanksService]
})
export class ThanksModule {}
