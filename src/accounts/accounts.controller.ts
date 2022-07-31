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
    async activate(@Param('id', ParseIntPipe) id: number): Promise<Account> {
        return this.accountsService.activate(id);
    }
    @Put()
    async update(@Param('id', ParseIntPipe) id: number, @Body() account: Account): Promise<Account> {
        return this.accountsService.update(id, account);
    }
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
        this.accountsService.delete(id);
    }
    @Get()
    async findAccounts(@Query() query?: { key?: string, start_date?: Date, end_date?: Date}): Promise<Account[]> {
        console.log(query);
        return this.accountsService.findAll(query.key, query.start_date, query.end_date);
    }
    @Get(':id')
    async findOneAccount(@Param('id', ParseIntPipe) id: number): Promise<Account> {
        return this.accountsService.findOne(id);
    }

    // Asks endpoints
    @Post(':uid/asks')
    createAsk() {
        return 
    }
}
