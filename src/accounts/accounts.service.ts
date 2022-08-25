import { BadRequestException, Injectable, NotFoundException, Param, ParseIntPipe } from '@nestjs/common';
import { CreateAccountDto } from 'src/dto/create-account.dto';
import { Account } from '../interfaces/account.interface';

@Injectable()
export class AccountsService {
    public readonly accounts: Account[] = [];
    public counter = 0;
    static Actors = {
        0: "RU",
        1: "RU",
        2: "CSR"
    };

    private account0 = {
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
    private account1 = {
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
    private account2 = {
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
        this.create(this.account0);
        this.create(this.account1);
        this.create(this.account2);
    }
    create(createAccountDto: CreateAccountDto): Account {
        // find the next id for a new account
        let uid = this.counter;
        let date = new Date();
        const newAccount: Account = {
            ...createAccountDto,
            uid
        };
        newAccount.date_created = date;
        this.accounts.push(newAccount);
        this.counter ++;

        return newAccount;
    }
    activate(uid: number): Account {
        if (uid == null || typeof uid != 'number') {
            throw new BadRequestException('UID cannot be empty and must be of type: Number')
        }
        if (!this.accounts[uid]) {
            throw new NotFoundException('Account UID not found, cannot ACTIVATE');
        }
        let index = this.accounts.findIndex(account => {
            account.uid == uid
            return account.uid == uid
        });
        this.accounts[index].is_active = true;
        return this.accounts[index];
    }
    update(uid: number, account: Account): void {
        if (!this.accounts[uid]) {
            throw new NotFoundException('Account UID not found, cannot UPDATE');
        }
        if (account.is_active != this.accounts[uid].is_active && account.is_active == true) {
            throw new BadRequestException('CANNOT activate account by UPDATING');
        }
        let updatedAccount: Account = {
            ...account
        };
        updatedAccount.date_created = this.accounts[uid].date_created;
        this.accounts[uid] = updatedAccount;
        this.accounts[uid].uid = +this.accounts[uid].uid;
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
            if (start_date || end_date) {
                return this.accounts.filter(account => { 
                    // TO-DO: Process s_date & e_date (date_created of the resource is >= the begining of start_date and less than the end of end_date)
                    let accountName = account.name.toLowerCase();
                    let accountAddressStreet = account.address.street.toLowerCase();    
                return (accountName.includes(key.toLowerCase()) || accountAddressStreet.includes(key.toLowerCase()) || account.address.zip.includes(key) || account.phone.includes(key)) && ((account.date_created > start_date) && (account.date_created < end_date))});
            }
            return this.accounts.filter(account => { 
                // TO-DO: Process s_date & e_date (date_created of the resource is >= the begining of start_date and less than the end of end_date)
                let accountName = account.name.toLowerCase();
                let accountAddressStreet = account.address.street.toLowerCase();
                return accountName.includes(key.toLowerCase()) || accountAddressStreet.includes(key.toLowerCase()) || account.address.zip.includes(key) || account.phone.includes(key) });
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
