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
import { CreateThankDto } from 'src/dto/create-thank.dto';
import { Note } from 'src/interfaces/note.interface';
import { Ask } from 'src/interfaces/ask.interface';
import { Give } from 'src/interfaces/give.interface';

@Controller('accounts')
export class AccountsController {
    constructor(private accountsService: AccountsService, private asksService: AsksService, private givesService: GivesService, private thanksService: ThanksService, private notesService: NotesService, private reportsService: ReportsService){}

     //** ---------------- **\\
    //** Accounts endpoints **\\
    @Post()
    create(@Body() createAccountDto: CreateAccountDto) {
        return this.accountsService.create(createAccountDto);
    }
    @Get(':uid/activate')
    activateAccount(@Param('uid', ParseIntPipe) uid: number): Account {
        return this.accountsService.activate(uid);
    }
    @Put(':uid')
    updateAccount(@Param('uid', ParseIntPipe) uid: number, @Body() account: Account): Account {
        return this.accountsService.update(uid, account);
    }
    @Delete(':uid')
    deleteAccount(@Param('uid', ParseIntPipe) uid: number): void {
        this.accountsService.delete(uid);
    }
    @Get()
    findAccounts(@Query() query?: { key?: string, start_date?: Date, end_date?: Date}): Account[] {
        console.log(query);
        return this.accountsService.findAll(query.key, query.start_date, query.end_date);
    }
    @Get(':uid')
    findOneAccount(@Param('uid', ParseIntPipe) uid: number): Account {
        return this.accountsService.findOne(uid);
    }

     //** ------------ **\\
    //** Asks endpoints **\\
    @Post(':uid/asks')
    createAsk(@Body() createAskDto: CreateAskDto) {
        return this.asksService.create(createAskDto);
    }
    @Get(':uid/asks/:aid/deactivate')
    deactivateAsk(@Param('uid', ParseIntPipe) uid: number, @Param('aid', ParseIntPipe) aid: number): Ask {
        return this.asksService.deactivate(uid, aid);
    }
    @Put(':uid/asks/:aid')
    updateAsk(@Param(':uid', ParseIntPipe) uid: number, @Param('aid', ParseIntPipe) aid: number, @Body() ask: Ask): Ask {
        return this.asksService.update(uid, aid, ask);
    }
    @Delete(':uid/asks/:aid')
    deleteAsk(@Param('uid', ParseIntPipe) uid: number, @Param('gid', ParseIntPipe) gid): void {
        return this.asksService.delete(uid, gid);
    }
    @Get(':uid/asks')
    getMyAsks(@Param('uid', ParseIntPipe) uid: number, @Query() query?: {is_active?: boolean}) {
        return this.asksService.getMyAsks(uid, query.is_active);
    }

     //** ------------- **\\
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

     //** -------------- **\\
    //** Thanks endpoints **\\    
    @Post(':uid/thanks')
    createThank(@Body() createThankDto: CreateThankDto) {
        return this.thanksService.createThank(createThankDto);
    }
    @Put(':uid/thanks/:tid')
    updateThank() {
        return this.thanksService.update();
    }
    @Get(':uid/thanks')
    getAccountThanks() {
        return this.thanksService.getMyThanks();
    }


     //** ------------- **\\
    //** Notes endpoints **\\

    // Update Ask
    @Put(':uid/asks/:aid/notes/:nid')
    updateAskNote() {
        return this.notesService.updateAskNote();
    }
    // Update Give
    @Put(':uid/gives/:gid/notes/:nid')
    updateGiveNote() {
        return this.notesService.updateGiveNote();
    }

    // Delete Ask
    @Delete(':uid/asks/:aid/notes/:nid')
    deleteAskNote() {
        return this.notesService.deleteAskNote();
    }
    // Delete Give
    @Delete(':uid/gives/:gid/notes/:nid')
    deleteGiveNote() {
        return this.notesService.deleteGiveNote();
    }

    // View ask notes
    @Get(':uid/asks/:aid/notes/:nid')
    getAskNotes() {
        return this.notesService.viewNotes();
    }
    // View give notes
    @Get(':uid/gives/:gid/notes/:nid')
    getGiveNotes() {
        return this.notesService.viewNotes();
    }
}
