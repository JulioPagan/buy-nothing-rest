import { Body, Controller, Get, Post } from '@nestjs/common';
import { GivesService } from './gives.service';
import { Give } from 'src/interfaces/give.interface';
import { CreateGiveDto } from 'src/dto/create-give.dto';

@Controller('gives')
export class GivesController {
    constructor(private givesService: GivesService){}

    @Post()
    async create(@Body() createGiveDto: CreateGiveDto){
        this.givesService.create(createGiveDto);
    }
    
    @Get()
    async findGives(): Promise<Give[]> {
        return this.givesService.findAll();
    }
}
