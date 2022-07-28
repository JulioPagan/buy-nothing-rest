import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ThanksService } from './thanks.service';
import { Thank } from 'src/interfaces/thank.interface';
import { CreateThankDto } from 'src/dto/create-thank.dto';

@Controller('thanks')
export class ThanksController {
    constructor(private thanksService: ThanksService){}
    
    @Get()
    async findThanks(): Promise<Thank[]> {
        return this.thanksService.findAll();
    }
    @Get(':tid')
    async findOneThank(@Param('tid', ParseIntPipe) tid: number): Promise<Thank> {
        return this.thanksService.findOne(tid);
    }
    @Get('/received:id')
    async findThanksForUser(@Param('id', ParseIntPipe) id: number): Promise<Thank> {
        return this.thanksService.findAllForUser(id);
    }
    // INCOMPLETE TEMPLATE - MUST FIX
    @Get(':key')
    async searchThanks(@Param('key') key: string): Promise<Thank[]> {
        return this.thanksService.search(key);
    }

}
