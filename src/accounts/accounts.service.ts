import { BadRequestException, Injectable, NotFoundException, Param, ParseIntPipe } from '@nestjs/common';
import { Account } from '../interfaces/account.interface';

@Injectable()
export class AccountsService {
    private readonly accounts: Account[] = [];

    create(account: Account): Account {
        // find the next id for a new account
        const maxId: number = Math.max(...this.accounts.map((account) => account.id), 0);
        const id: number = maxId + 1;

        const newAccount: Account = {
            ...account,
            id
        };
        this.accounts.push(newAccount);
        return newAccount;
    }
    activate(id: number): Account {
        const index: number = this.accounts.findIndex((account) => account.id === id);
        this.accounts[index].is_active = true;
        return this.accounts[index];
    } 
    update(id: number, account: Account): Account {
        const index: number = this.accounts.findIndex((account) => account.id === id);
        //no match handler (-1):
        if (index === -1) {
            throw new NotFoundException('Account not found.');
        }
        //if id is already being used by another account give error
        const idExists: boolean = this.accounts.some(
            (item) => item.id === account.id && item.id !== id,
        );
        if (idExists) {
        throw new BadRequestException('Account id cannot update another account id');
        }
        
        const updatedAccount: Account = {
            ...account,
            id
        };
        this.accounts[index] = updatedAccount;
        return updatedAccount;
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
        return this.accounts;
    }
    findOne(id: number): Account {
        const account: Account = this.accounts.find(account => account.id === id);

        if (!account) {
            throw new NotFoundException('Account Not Found');
        }
        return account;
    }
    // Search accounts by keyword
    search(key: string): Account[] {
        const matchingAccounts: Account[] = {
            ...this.accounts
        };
        return matchingAccounts;
    }
}
