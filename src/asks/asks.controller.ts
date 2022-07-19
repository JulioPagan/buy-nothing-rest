import { Body, Controller, Get, Post } from '@nestjs/common';
import { AsksService } from './asks.service';
import { Ask } from 'src/interfaces/ask.interface';
import { CreateAskDto } from 'src/dto/create-ask.dto';

@Controller('asks')
export class AsksController {
    constructor(private asksService: AsksService){}

    @Post()
    async create(@Body() createAskDto: CreateAskDto){
        this.asksService.create(createAskDto);
    }
    
    @Get()
    async findAsks(): Promise<Ask[]> {
        return this.asksService.findAll();
    }
}
