import { Injectable, NotFoundException, Param, ParseIntPipe } from '@nestjs/common';
import { Account } from '../interfaces/account.interface';

@Injectable()
export class AccountsService {
    private readonly accounts: Account[] = [];

    create(account: Account): Account {

        this.accounts.push(account);

        return account;
    }
    delete(id: number): void {
        const index: number = this.accounts.findIndex(account => account.id === id);
        //no match handler (-1):
        if (index === -1) {
            throw new NotFoundException('Account not found')
        }
        this.accounts.splice(index, 1);
    }
    findAll(): Account[] {
        return this.accounts
    }
    findOne(id: number): Account {
        const account: Account = this.accounts.find(account => account.id === id);

        if (!account) {
            throw new NotFoundException('Account Not Found');
        }
        return account;
    }
}
