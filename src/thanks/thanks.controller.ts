import { Body, Controller, Get, Post } from '@nestjs/common';
import { ThanksService } from './thanks.service';
import { Thank } from 'src/interfaces/thank.interface';
import { CreateThankDto } from 'src/dto/create-thank.dto';

@Controller('thanks')
export class ThanksController {
    constructor(private thanksService: ThanksService){}

    @Post()
    async create(@Body() createThankDto: CreateThankDto){
        this.thanksService.create(createThankDto);
    }
    
    @Get()
    async findThanks(): Promise<Thank[]> {
        return this.thanksService.findAll();
    }
}
