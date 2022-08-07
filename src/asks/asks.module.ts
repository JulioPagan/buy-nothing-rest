import { Global, Module } from '@nestjs/common';
import { AsksController } from './asks.controller';
import { AsksService } from './asks.service';

@Module({
  controllers: [AsksController],
  providers: [AsksService],
  exports: [AsksService]
})
export class AsksModule {}
