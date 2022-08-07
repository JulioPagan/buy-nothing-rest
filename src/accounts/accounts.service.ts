import { BadRequestException, Injectable, NotFoundException, Param, ParseIntPipe } from '@nestjs/common';
import { CreateAccountDto } from 'src/dto/create-account.dto';
import { Account } from '../interfaces/account.interface';

@Injectable()
export class AccountsService {
    private readonly accounts: Account[] = [];
    private counter = 0;

    create(createAccountDto: CreateAccountDto): Account {
        // find the next id for a new account
        let uid = this.counter;
        const newAccount: Account = {
            ...createAccountDto,
            uid
        };
        this.accounts.push(newAccount);
        this.counter ++;
        return newAccount;
    }
    activate(uid: number): Account {
        if (!this.accounts[uid]) {
            throw new NotFoundException('Account UID not found, cannot ACTIVATE');
        }
        // const index: number = this.accounts.findIndex((account) => account.uid === uid);
        this.accounts[uid].is_active = true;
        return this.accounts[uid];
    } 
    update(uid: number, account: Account): Account {
        if (!this.accounts[uid]) {
            throw new NotFoundException('Account UID not found, cannot UPDATE');
        }
        const updatedAccount: Account = {
            ...account
        };
        this.accounts[uid] = updatedAccount;
        return updatedAccount;
    }
    delete(uid: number): void {
        if (!this.accounts[uid]) {
            throw new NotFoundException('Account UID not found, cannot DELETE');
        }
        this.accounts.splice(uid, 1);
    }
    // Search ALL accounts or add optional queries
    findAll(key?: string, start_date?: Date, end_date?: Date): Account[] {
        if (key) {
            return this.accounts.filter(account => { 
                let accountName = account.name.toLowerCase();
                return accountName.includes(key.toLowerCase()) });
        }
        return this.accounts;
    }
    findOne(uid: number): Account {
        const account: Account = this.accounts.find(account => account.uid === uid);

        if (!account) {
            throw new NotFoundException('Account Not Found');
        }
        return account;
    }
}
