import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { Account } from 'src/interfaces/account.interface';
import { CreateAccountDto } from 'src/dto/create-account.dto';

@Controller('accounts')
export class AccountsController {
    constructor(private accountsService: AccountsService){}

    @Post()
    async create(@Body() createAccountDto: CreateAccountDto) {
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
    createAsk() {
        return 'This request creates an ask'
    }
    @Get(':uid/asks/:aid/deactivate')
    deactivateAsk() {
        return 'This request deactivates an ask based on id'
    }
    @Put(':uid/asks/:aid')
    updateAsk() {
        return 'This request updates an existing Ask'
    }
    @Delete(':uid/asks/:aid')
    deleteAsk() {
        return 'This request deletes an asks'
    }
    @Get(':uid/asks')
    getAsksByActive(@Query() query?: {is_active: boolean}) {
        return 'This request returns the asks that are active';
    }


    //** Gives endpoints **\\
    @Post(':uid/gives')
    createGive() {
        return 'This request creates a give'
    }
    @Get(':uid/gives/:gid/deactivate')
    deactivateGive() { 
        return 'This request deactivates a give'
    }
    @Put(':uid/gives/:gid')
    updateGive() {
        return 'This request updates a give'
    }
    @Delete(':uid/gives/:gid')
    deleteGive() {
        return 'This request updates a give'
    }
    @Get(':uid/gives')
    getAccountGives() {
        return 'This request finds the gives for an account'
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

// TO-DO: CREATE ENDPOINTS 
    //** Notes endpoints **/
    // @Put(':uid/a')

    // @Delete('')

    // @Get()

}
