import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { GivesService } from './gives.service';
import { Give } from 'src/interfaces/give.interface';
import { CreateGiveDto } from 'src/dto/create-give.dto';

@Controller('gives')
export class GivesController {
    constructor(private givesService: GivesService){}

    @Get()
    async findGives(): Promise<Give[]> {
        return this.givesService.findAll();
    }
    @Get(':gid')
    async findOneGive(@Param('aid', ParseIntPipe) gid: number): Promise<Give> {
        return this.givesService.findOne(gid);
    }
    // Search accounts by keyword
    @Get(':key')
    async searchGives(@Param('key') key: string): Promise<Give[]> {
        return this.givesService.search(key);
    }
}
