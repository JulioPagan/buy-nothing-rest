import { BadRequestException, Body, Controller, Delete, Get, Header, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query, Res } from '@nestjs/common';
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
    updateAccount(@Param('uid') uid: string, @Body() account: Account, @Res( {passthrough: true}) res): void {
        try {
            this.accountsService.update(parseInt(uid), account);
        } catch(BadRequestException) {
            res.status(400);
            res.send({"type": "http://cs.iit.edu/~virgil/cs445/mail.spring2022/project/api/problems/data-validation",
            "title": "Your request data didn't pass validation",
            "detail": "You may not use PUT to activate an account, use GET /accounts/" + uid + "/activate instead",
            "status": 400,
            "instance": "/accounts/" + uid
        });
        }
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
    createAsk(@Param('uid') uid: string, @Body() createAskDto: CreateAskDto, @Res( {passthrough: true}) res) {
        // Check if the account creating the ask is active
        if (!this.accountsService.accounts[parseInt(uid)].is_active) {
            throw new BadRequestException('INACTIVE Account CANNOTT create an Ask');
        }
        let locationHeader = '/accounts/' + createAskDto.uid + '/asks/' + this.asksService.counter;
        res.header('Location', locationHeader);
        let creation;
        try {
            creation = this.asksService.create(createAskDto);
        } catch(BadRequestException) {
            res.status(400);
            res.send({
                "type": "http://cs.iit.edu/~virgil/cs445/mail.spring2022/project/api/problems/data-validation",
                "title": "Your request data didn't pass validation",
                "detail": "This account " + uid + " is not active an may not create an ask.",
                "status": 400,
                "instance": "/accounts/" + uid
            });
        }
        return creation;
    }
    @Get(':uid/asks/:aid/deactivate')
    deactivateAsk(@Param('uid') uid: string, @Param('aid') aid: string): Ask {
        return this.asksService.deactivate(parseInt(uid), parseInt(aid));
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
    getMyAsks(@Param('uid', ParseIntPipe) uid: number, @Query() query?: {is_active?: string}) {
        return this.asksService.getMyAsks(uid, query.is_active);
    }

     //** ------------- **\\
    //** Gives endpoints **\\
    @Post(':uid/gives')
    createGive(@Param('uid') uid: string, @Body() createGiveDto: CreateGiveDto, @Res( {passthrough: true}) res) {
        // Check if the account creating the give is active
        if (!this.accountsService.accounts[parseInt(uid)].is_active) {
            throw new BadRequestException('INACTIVE Account CANNOTT create a Give');
        }
        let locationHeader = '/accounts/' + createGiveDto.uid + '/gives/' + this.givesService.counter;
        res.header('Location', locationHeader);
        let creation;
        try {
            creation = this.givesService.create(createGiveDto);
        } catch(BadRequestException) {
            console.log('in catch');
            res.status(400);
            res.send({
                "type": "http://cs.iit.edu/~virgil/cs445/mail.spring2022/project/api/problems/data-validation",
                "title": "Your request data didn't pass validation",
                "detail": "This account " + uid + " is not active an may not create a give.",
                "status": 400,
                "instance": "/accounts/" + uid
              });
        }
        return creation;
        }
    
    @Get(':uid/gives/:gid/deactivate')
    deactivateGive(@Param('uid') uid: string, @Param('gid') gid: string): Give { 
        return this.givesService.deactivateGive(parseInt(uid), parseInt(gid));
    }
    @Put(':uid/gives/:gid')
    @HttpCode(HttpStatus.NO_CONTENT)
    updateGive(@Param('uid') uid: string, @Param('gid') gid: string, @Body() give: Give): void {
        return this.givesService.update(parseInt(uid), parseInt(gid), give);
    }
    @Delete(':uid/gives/:gid')
    @HttpCode(HttpStatus.NO_CONTENT)
    deleteGive(@Param('uid') uid: string, @Param('gid') gid: string): void {
        return this.givesService.delete(parseInt(uid), parseInt(gid));
    }
    @Get(':uid/gives')
    getMyGives(@Param('uid', ParseIntPipe) uid: number, @Query() query?: {is_active?: string}) {
        return this.givesService.getMyGives(uid, query.is_active);
    }

     //** -------------- **\\
    //** Thanks endpoints **\\    
    @Post(':uid/thanks')
    createThank(@Param('uid') uid: string, @Body() createThankDto: CreateThankDto, @Res( {passthrough: true}) res) {
        let locationHeader = '/accounts/' + createThankDto.uid + '/thanks/' + this.thanksService.counter;
        res.header('Location', locationHeader);
        return this.thanksService.createThank(createThankDto);
    }
    @Put(':uid/thanks/:tid')
    @HttpCode(HttpStatus.NO_CONTENT)
    updateThank(@Param('uid', ParseIntPipe) uid: number, @Param('tid', ParseIntPipe) tid: number, @Body() thank: Thank): Thank {
        return this.thanksService.update(uid, tid, thank);
    }
    @Get(':uid/thanks')
    getMyThanks(@Param('uid', ParseIntPipe) uid: number, @Query() query?: {is_active?: boolean}) {
        return this.thanksService.getMyThanks(uid, query.is_active);
    }
}
