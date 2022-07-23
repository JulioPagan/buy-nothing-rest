import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
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
    
    @Get()
    async findAccounts(): Promise<Account[]> {
        return this.accountsService.findAll();
    }
    @Get(':id')
    public findOneAccount(@Param('id', ParseIntPipe) id: number): Account {
        return this.accountsService.findOne(id);
    }
}
