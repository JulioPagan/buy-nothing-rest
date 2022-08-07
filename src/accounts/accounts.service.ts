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
        const index: number = this.accounts.findIndex((account) => account.uid === uid);
        this.accounts[index].is_active = true;
        return this.accounts[index];
    } 
    // Update account
    // INCOMPLETE TEMPLATE - MUST FIX
    update(uid: number, account: Account): Account {
        const index: number = this.accounts.findIndex((account) => account.uid === uid);
        //no match handler (-1):
        if (index === -1) {
            throw new NotFoundException('Account not found.');
        }
        //if id is already being used by another account give error
        const idExists: boolean = this.accounts.some(
            (item) => item.uid === account.uid && item.uid !== uid,
        );
        if (idExists) {
        throw new BadRequestException('Account id cannot update another account uid');
        }
        
        const updatedAccount: Account = {
            ...account,
            uid
        };
        this.accounts[index] = updatedAccount;
        return updatedAccount;
    }
    delete(uid: number): void {
        const index: number = this.accounts.findIndex(account => account.uid === uid);
        //no match handler (-1):
        if (index === -1) {
            throw new NotFoundException('Account not found')
        }
        this.accounts.splice(index, 1);
    }
    // ?key=keyword{&start_date=DD-MMM-YYYY&end_date=DD-MMM-YYYY} )
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
