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
        return 
    }

    @Get(':uid/asks/:aid/deactivate')
    deactivateAsk(){
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
        return 'This request returns ';
    }


    //** Gives endpoints **\\
    
}
