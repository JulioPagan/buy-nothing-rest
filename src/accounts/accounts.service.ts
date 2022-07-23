import { Injectable, NotFoundException, Param, ParseIntPipe } from '@nestjs/common';
import { Account } from '../interfaces/account.interface';

@Injectable()
export class AccountsService {
    private readonly accounts: Account[] = [];

    create(account: Account): Account {
        
        this.accounts.push(account);

        return account;
    }
    findAll(): Account[] {
        return this.accounts
    }
    public findOne(id: number): Account {
        const account: Account = this.accounts.find(account => account.id === id);

        if (!account) {
            throw new NotFoundException('Account Not Found');
        }
        return account;
    }
}
