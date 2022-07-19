import { Module } from '@nestjs/common';
import { GivesController } from './gives.controller';
import { GivesService } from './gives.service';

@Module({
  controllers: [GivesController],
  providers: [GivesService]
})
export class GivesModule {}
