import { Controller, Get } from '@nestjs/common';

@Controller('accounts')
export class AccountsController {
    @Get()
    getAccounts(): string {
        return "This returns all accounts"
    }
}
