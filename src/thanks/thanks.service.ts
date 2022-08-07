import { Injectable, NotFoundException } from '@nestjs/common';
import { Thank } from 'src/interfaces/thank.interface';

@Injectable()
export class ThanksService {
    private readonly thanks: Thank[] = [];
    createThank(thank: Thank) {
        this.thanks.push(thank);
    }
    update() {

    }
    getMyThanks() {

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
    // INCOMPLETE TEMPLATE - MUST FIX
    findAllForUser(id: number): Thank {
        const thank: Thank = this.thanks.find(thank => thank.tid === id);
        if (!thank) {
            throw new NotFoundException('Thanks Not Found');
        }

        return thank;
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
