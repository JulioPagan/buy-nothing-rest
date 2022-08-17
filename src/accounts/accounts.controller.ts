import { Body, Controller, Delete, Get, Header, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query, Res } from '@nestjs/common';
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
import { Thank } from 'src/interfaces/thank.interface';

@Controller('accounts')
export class AccountsController {
    constructor(private accountsService: AccountsService, private asksService: AsksService, private givesService: GivesService, private thanksService: ThanksService, private notesService: NotesService, private reportsService: ReportsService){}

     //** ---------------- **\\
    //** Accounts endpoints **\\
    @Post()
    create(@Body() createAccountDto: CreateAccountDto, @Res( {passthrough: true}) res) {
        let locationHeader = '/accounts/' + this.accountsService.counter;
        res.header('Location', locationHeader);
        return this.accountsService.create(createAccountDto);
    }
    @Get(':uid/activate')
    activateAccount(@Param('uid') uid: string): Account {
        return this.accountsService.activate(parseInt(uid));
    }
    @Put(':uid')
    @HttpCode(HttpStatus.NO_CONTENT)
    updateAccount(@Param('uid') uid: string, @Body() account: Account): void {
        this.accountsService.update(parseInt(uid), account);
    }
    @Delete(':uid')
    deleteAccount(@Param('uid', ParseIntPipe) uid: number): void {
        this.accountsService.delete(uid);
    }
    @Get()
    findAccounts(@Query() query?: { key?: string, start_date?: Date, end_date?: Date}): Account[] {
        return this.accountsService.findAll(query.key, query.start_date, query.end_date);
    }
    @Get(':uid')
    findOneAccount(@Param('uid') uid: string): Account {
        return this.accountsService.findOne(parseInt(uid));
    }

     //** ------------ **\\
    //** Asks endpoints **\\
    @Post(':uid/asks')
    createAsk(@Body() createAskDto: CreateAskDto, @Res( {passthrough: true}) res) {
        let locationHeader = '/accounts/' + createAskDto.uid + '/asks/' + this.asksService.counter;
        res.header('Location', locationHeader);
        return this.asksService.create(createAskDto);
    }
    @Get(':uid/asks/:aid/deactivate')
    deactivateAsk(@Param('uid', ParseIntPipe) uid: number, @Param('aid', ParseIntPipe) aid: number): Ask {
        return this.asksService.deactivate(uid, aid);
    }
    @Put(':uid/asks/:aid')
    @HttpCode(HttpStatus.NO_CONTENT)
    updateAsk(@Param('uid') uid: string, @Param('aid') aid: string, @Body() ask: Ask): void {
        return this.asksService.update(parseInt(uid), parseInt(aid), ask);
    }
    @Delete(':uid/asks/:aid')
    @HttpCode(HttpStatus.NO_CONTENT)
    deleteAsk(@Param('uid') uid: string, @Param('aid') aid: string): void {
        return this.asksService.delete(parseInt(uid), parseInt(aid));
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
    deactivateGive(@Param('uid', ParseIntPipe) uid: number, @Param('gid', ParseIntPipe) gid: number): Give { 
        return this.givesService.deactivateGive(uid, gid);
    }
    @Put(':uid/gives/:gid')
    updateGive(@Param('uid', ParseIntPipe) uid: number, @Param('gid', ParseIntPipe) gid: number, @Body() give: Give): Give {
        return this.givesService.update(uid, gid, give);
    }
    @Delete(':uid/gives/:gid')
    deleteGive(@Param('uid', ParseIntPipe) uid: number, @Param('gid', ParseIntPipe) gid: number): void {
        return this.givesService.delete(uid, gid);
    }
    @Get(':uid/gives')
    getMyGives(@Param('uid', ParseIntPipe) uid: number, @Query() query?: {is_active?: boolean}) {
        return this.givesService.getMyGives(uid, query.is_active);
    }

     //** -------------- **\\
    //** Thanks endpoints **\\    
    @Post(':uid/thanks')
    createThank(@Body() createThankDto: CreateThankDto) {
        return this.thanksService.createThank(createThankDto);
    }
    @Put(':uid/thanks/:tid')
    updateThank(@Param('uid', ParseIntPipe) uid: number, @Param('tid', ParseIntPipe) tid: number, @Body() thank: Thank): Thank {
        return this.thanksService.update(uid, tid, thank);
    }
    @Get(':uid/thanks')
    getMyThanks(@Param('uid', ParseIntPipe) uid: number, @Query() query?: {is_active?: boolean}) {
        return this.thanksService.getMyThanks(uid, query.is_active);
    }


     //** ------------- **\\
    //** Notes endpoints **\\       Endpoints not exercised by the functional testing environment

    // Update Ask
    // @Put(':uid/asks/:aid/notes/:nid')
    // updateAskNote(@Param('uid', ParseIntPipe) uid: number, @Param('aid', ParseIntPipe) aid: number, @Param('nid', ParseIntPipe) nid: number, @Body() note: Note): Note{
    //     return this.notesService.updateAskNote(uid, aid, nid, note);
    // }
    // // Update Give
    // @Put(':uid/gives/:gid/notes/:nid')
    // updateGiveNote(@Param('uid', ParseIntPipe) uid: number, @Param('gid', ParseIntPipe) gid: number, @Param('nid', ParseIntPipe) nid: number, @Body() note: Note): Note{
    //     return this.notesService.updateGiveNote(uid, gid, nid, note);
    // }
    // // Delete Ask
    // @Delete(':uid/asks/:aid/notes/:nid')
    // deleteAskNote(@Param('uid', ParseIntPipe) uid: number, @Param('aid', ParseIntPipe) aid: number, @Param('nid', ParseIntPipe) nid: number): void {
    //     return this.notesService.deleteAskNote(uid, aid, nid);
    // }
    // // Delete Give
    // @Delete(':uid/gives/:gid/notes/:nid')
    // deleteGiveNote(@Param('uid', ParseIntPipe) uid: number, @Param('aid', ParseIntPipe) aid: number, @Param('nid', ParseIntPipe) nid: number): void {
    //     return this.notesService.deleteGiveNote(uid, aid, nid);
    // }
}
