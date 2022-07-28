import { Injectable, NotFoundException } from '@nestjs/common';
import { Thank } from 'src/interfaces/thank.interface';

@Injectable()
export class ThanksService {
    private readonly thanks: Thank[] = [];

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
    // INCOMPLETE TEMPLATE - MUST FIX
    search(key: string): Thank[] {
        const matchingThanks: Thank[] = {
            ...this.thanks
        };
        return matchingThanks;
    }

}
