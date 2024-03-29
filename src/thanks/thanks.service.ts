import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateThankDto } from 'src/dto/create-thank.dto';
import { Thank } from 'src/interfaces/thank.interface';

@Injectable()
export class ThanksService {
    public readonly thanks: Thank[] = [];
    public counter: number = 0;

    createThank(createThankDto: CreateThankDto): Thank {
        if (createThankDto.tid) {
            throw new BadRequestException("Cannot Pre-Select thank TID");
        }
        if (createThankDto.date_created) {
            throw new BadRequestException("Cannot Pre-Select thank date_created");
        }
        if ((createThankDto.uid == null || "") || (createThankDto.thank_to == null || "") || (createThankDto.description == null || "")) {
            throw new BadRequestException("Must enter all required fields");
        }; 

        let tid = this.counter;
        let date = new Date();
        const newThank: Thank = {
            ...createThankDto,
            tid
        };
        newThank.date_created = date;
        newThank.uid = +newThank.uid;
        newThank.tid = + newThank.tid;
        newThank.thank_to = +newThank.thank_to;
        this.thanks.push(newThank);
        this.counter ++;
        return newThank;
    }
    update(uid: number, tid: number, thank: Thank): Thank {
        if (!this.thanks[tid]) {
            throw new NotFoundException('Thank TID not found, cannot UPDATE');
        }else if (uid != this.thanks[tid].uid) {
            throw new NotFoundException('Account UID invalid, cannot UPDATE');
        }

        const updatedThanks: Thank = {
            ...thank
        };
        this.thanks[tid] = updatedThanks;
        return updatedThanks;
    }
    getMyThanks(uid: number, is_active?: boolean): Thank[] {
        // TO-DO: Process is_active
        if (uid) {
            return this.thanks.filter(thank => { 
                return thank.uid == uid;
            });
        }else {
            throw new NotFoundException('Valid UID required to find account Thanks');
        }
    }
    findAll(): Thank[] {
        return this.thanks
    }
    findOne(tid: number): Thank {
        const thank: Thank = this.thanks.find(thank => thank.tid === tid);
        if (!thank) {
            throw new NotFoundException('Thank Not Found');
        }

        return thank;
    }
    findAllForUser(uid: number): Thank[] {
        if (uid != null) {
            return this.thanks.filter(thank => { 
                return (thank.thank_to == uid);
            });
        } else {
            throw new NotFoundException('NO thanks found for the specified user');
        };
    }
    searchThanks(key?: string, start_date?: Date, end_date?: Date): Thank[] {
        if (key) {
            if (start_date) {
                if (end_date) {
                    return this.thanks.filter(thank => { 
                        let thankDescription = thank.description.toLowerCase();
                    return (thankDescription.includes(key.toLowerCase())) && ((thank.date_created > start_date) && (thank.date_created < end_date))});
                }
                return this.thanks.filter(thank => { 
                    let thankDescription = thank.description.toLowerCase();
                return (thankDescription.includes(key.toLowerCase())) && (thank.date_created > start_date)});
            } else if (end_date) {
                return this.thanks.filter(thank => { 
                    let thankDescription = thank.description.toLowerCase();
                return (thankDescription.includes(key.toLowerCase()) ) && (thank.date_created < end_date)});
            }

            return this.thanks.filter(thank => { 
                let thankDescription = thank.description.toLowerCase();
                return thankDescription.includes(key.toLowerCase()) });
        }
        return this.thanks;
    }
}
