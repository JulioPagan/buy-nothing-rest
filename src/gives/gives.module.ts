import { Global, Module } from '@nestjs/common';
import { GivesController } from './gives.controller';
import { GivesService } from './gives.service';

@Module({
  controllers: [GivesController],
  providers: [GivesService],
  exports: [GivesService]
})
export class GivesModule {}
