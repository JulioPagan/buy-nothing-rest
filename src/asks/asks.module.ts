import { Module } from '@nestjs/common';
import { AsksController } from './asks.controller';
import { AsksService } from './asks.service';

@Module({
  controllers: [AsksController],
  providers: [AsksService]
})
export class AsksModule {}
