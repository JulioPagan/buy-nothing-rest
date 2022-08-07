import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AsksService } from 'src/asks/asks.service';
import { GivesService } from 'src/gives/gives.service';
import { ThanksService } from 'src/thanks/thanks.service';
import { NotesService } from 'src/notes/notes.service';
import { ReportsService } from 'src/reports/reports.service';
import { Account } from 'src/interfaces/account.interface';
import { CreateAccountDto } from 'src/dto/create-account.dto';
import { CreateAskDto } from 'src/dto/create-ask.dto';
import { CreateGiveDto } from 'src/dto/create-give.dto';

@Controller('accounts')
export class AccountsController {
    constructor(private accountsService: AccountsService, private asksService: AsksService, private givesService: GivesService, private thanksService: ThanksService, private notesService: NotesService, private reportsService: ReportsService){}

    @Post()
    create(@Body() createAccountDto: CreateAccountDto) {
        this.accountsService.create(createAccountDto);
    }
    @Get(':id/activate')
    activate(@Param('id', ParseIntPipe) id: number): Account {
        return this.accountsService.activate(id);
    }
    @Put()
    update(@Param('id', ParseIntPipe) id: number, @Body() account: Account): Account {
        return this.accountsService.update(id, account);
    }
    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number): void {
        this.accountsService.delete(id);
    }
    @Get()
    findAccounts(@Query() query?: { key?: string, start_date?: Date, end_date?: Date}): Account[] {
        console.log(query);
        return this.accountsService.findAll(query.key, query.start_date, query.end_date);
    }
    @Get(':id')
    findOneAccount(@Param('id', ParseIntPipe) id: number): Account {
        return this.accountsService.findOne(id);
    }

    //** Asks endpoints **\\
    @Post(':uid/asks')
    createAsk(@Body() createAskDto: CreateAskDto) {
        return this.asksService.create(createAskDto);
    }
    @Get(':uid/asks/:aid/deactivate')
    deactivateAsk() {
        return this.asksService.deactivate();
    }
    @Put(':uid/asks/:aid')
    updateAsk() {
        return this.asksService.update();
    }
    @Delete(':uid/asks/:aid')
    deleteAsk() {
        return this.asksService.delete();
    }
    @Get(':uid/asks')
    getMyAsks(@Query() query?: {is_active: boolean}) {
        return this.asksService.getMyAsks();
    }


    //** Gives endpoints **\\
    @Post(':uid/gives')
    createGive(@Body() createGiveDto: CreateGiveDto) {
        return this.givesService.create(createGiveDto);
    }
    @Get(':uid/gives/:gid/deactivate')
    deactivateGive() { 
        return this.givesService.deactivate();
    }
    @Put(':uid/gives/:gid')
    updateGive() {
        return this.givesService.update();
    }
    @Delete(':uid/gives/:gid')
    deleteGive() {
        return this.givesService.delete();
    }
    @Get(':uid/gives')
    getMyGives() {
        return this.givesService.viewMyGives();
    }


    //** Thanks endpoints **\\    
    @Post(':uid/thanks')
    createThank() {
        return 'This request creates a thank'
    }
    @Put(':uid/thanks/:tid')
    updateThank() {
        return 'This request updates a thank'
    }
    @Get(':uid/thanks')
    getAccountThanks() {
        return 'This request finds the thanks for an account'
    }

    //** Notes endpoints **/
    @Put(':uid/asks/:aid/notes/:nid')
    updateAskNote() {
        return 'This request updates a note based on a given account and ask'
    }
    @Put(':uid/gives/:gid/notes/:nid')
    updateGiveNote() {
        return 'This request updates a note based on a given account and give'
    }

    @Delete(':uid/asks/:aid/notes/:nid')
    deleteAskNote() {
        return 'This request deletes a note based on a given account and give'
    }
    @Delete(':uid/gives/:gid/notes/:nid')
    deleteGiveNote() {
        return 'This request deletes a note based on a given account and give'
    }

    @Get(':uid/asks/:aid/notes/:nid')
    getAskNotes() {
        return 'This request finds the notes of a given account and ask'
    }
    @Get(':uid/gives/:gid/notes/:nid')
    getGiveNotes() {
        return 'This request finds the notes of a given account and ask'
    }
}
