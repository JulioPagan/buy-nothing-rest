import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ThanksService } from './thanks.service';
import { Thank } from 'src/interfaces/thank.interface';
import { CreateThankDto } from 'src/dto/create-thank.dto';

@Controller('thanks')
export class ThanksController {
    constructor(private thanksService: ThanksService){}
    
    @Get()
    findThanks(): Thank[] {
        return this.thanksService.findAll();
    }
    @Get(':tid')
    findOneThank(@Param('tid', ParseIntPipe) tid: number): Thank {
        return this.thanksService.findOne(tid);
    }
    @Get('/received:uid')
    findThanksForUser(@Param('uid', ParseIntPipe) uid: number): Thank[] {
        return this.thanksService.findAllForUser(uid);
    }
    @Get(':key')
    searchThanks(@Query() query?: { key?: string, start_date?: Date, end_date?: Date}): Thank[] {
        console.log(query);
        return this.thanksService.searchThanks(query.key, query.start_date, query.end_date);
    }

}
