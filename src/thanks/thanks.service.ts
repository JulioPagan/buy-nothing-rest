import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Thank } from 'src/interfaces/thank.interface';

@Injectable()
export class ThanksService {
    private readonly thanks: Thank[] = [];
    createThank(thank: Thank) {
        this.thanks.push(thank);
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
        if (uid) {
            return this.thanks.filter(thank => { 
                return thank.thank_to == uid;
            });
        }
        if (!uid) {
            throw new NotFoundException('Thanks Not Found');
        } else {
            throw new NotFoundException('NO Thanks Not Found for the specified account');
        }
    }
    searchThanks(key?: string, start_date?: Date, end_date?: Date): Thank[] {
        if (key) {
            return this.thanks.filter(thank => { 
                let thankDescription = thank.description.toLowerCase();
                return thankDescription.includes(key.toLowerCase()) });
        }
        return this.thanks;
    }
}
