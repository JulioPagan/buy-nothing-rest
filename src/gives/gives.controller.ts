import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { GivesService } from './gives.service';
import { Give } from 'src/interfaces/give.interface';
import { CreateGiveDto } from 'src/dto/create-give.dto';

@Controller('gives')
export class GivesController {
    constructor(private givesService: GivesService){}

    @Get()
    findGives(@Query() query: { v_by: number}): Give[] {
        return this.givesService.findAll(query.v_by);
    }
    @Get(':gid')
    findOneGive(@Param('gid', ParseIntPipe) gid: number): Give {
        return this.givesService.findOne(gid);
    }
    @Get()
    searchGives(@Query() query?: { key?: string, start_date?: Date, end_date?: Date}): Give[] {
        return this.givesService.searchGives(query.key, query.start_date, query.end_date);
    }
}
