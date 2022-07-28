import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
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
    // Search accounts by keyword
    @Get(':key')
    async searchAccounts(@Param('key') key: string): Promise<Ask[]> {
        return this.asksService.search(key);
    }

}
