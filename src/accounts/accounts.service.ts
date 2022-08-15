import { BadRequestException, Injectable, NotFoundException, Param, ParseIntPipe } from '@nestjs/common';
import { CreateAccountDto } from 'src/dto/create-account.dto';
import { Account } from '../interfaces/account.interface';

@Injectable()
export class AccountsService {
    private readonly accounts: Account[] = [];
    private counter = 0;
    static Actors = {
        0: "RU",
        1: "RU",
        2: "CSR"
    }

    private account1 = {
		"uid": null,
		"name": "Virgil Bistriceanu",
		"address": {
			"street": "10 West 31st ST",
			"zip": "60616"
		},
		"phone": "312-567-5146",
		"picture": "http://cs.iit.edu/~virgil/pictures/virgil-head-small-200811.jpg",
		"is_active": true,
		"date_created": ""
	};
    private account2 = {
		"uid": null,
		"name": "Jane Smith",
		"address": {
			"street": "123 2nd ST",
			"zip": "60607"
		},
		"phone": "217-456-7890",
		"picture": "http://example.com/images/jane-smith.jpeg",
		"is_active": false,
		"date_created": ""
	};
    private account3 = {
		"uid": null,
		"name": "CSR #1",
		"address": {
			"street": "101 W Main St.",
			"zip": "60010"
		},
		"phone": "(847) 842-8048",
		"picture": "http://example.com/images/jane-smith.jpeg",
		"is_active": true,
		"date_created": ""
	};
    
    constructor () {
        this.create(this.account1);
        this.create(this.account2);
        this.create(this.account3);
    }
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
                // TO-DO: Process s_date & e_date 
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
