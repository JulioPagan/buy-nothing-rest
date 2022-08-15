import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { AsksService } from './asks.service';
import { Ask } from 'src/interfaces/ask.interface';
import { CreateAskDto } from 'src/dto/create-ask.dto';

@Controller('asks')
export class AsksController {
    constructor(private asksService: AsksService){}

    @Get()
    findAsks(@Query() query: { v_by: string}): Ask[] {
        return this.asksService.findAll(parseInt(query.v_by));
    }
    @Get(':aid')
    findOneAsk(@Param('aid', ParseIntPipe) aid: number): Ask {
        return this.asksService.findOne(aid);
    }
    @Get()
    searchAsks(@Query() query?: { key?: string, start_date?: Date, end_date?: Date}): Ask[] {
        return this.asksService.searchAsks(query.key, query.start_date, query.end_date);
    }
}
