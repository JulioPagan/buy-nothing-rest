import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { AsksService } from './asks.service';
import { Ask } from 'src/interfaces/ask.interface';
import { CreateAskDto } from 'src/dto/create-ask.dto';

@Controller('asks')
export class AsksController {
    constructor(private asksService: AsksService){}

    @Get()
    async findAsks(): Promise<Ask[]> {
        return this.asksService.findAll();
    }
    @Get(':aid')
    async findOneAsk(@Param('aid', ParseIntPipe) aid: number): Promise<Ask> {
        return this.asksService.findOne(aid);
    }
    @Get(':key')
    searchAsks(@Query() query?: { key?: string, start_date?: Date, end_date?: Date}): Ask[] {
        console.log(query);
        return this.asksService.searchAsks(query.key, query.start_date, query.end_date);
    }
}
