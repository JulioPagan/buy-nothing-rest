import { Injectable } from '@nestjs/common';
import { Thank } from 'src/interfaces/thank.interface';

@Injectable()
export class ThanksService {
    private readonly thanks: Thank[] = [];

    create(thank: Thank) {
        this.thanks.push(thank);
    }
    findAll(): Thank[] {
        return this.thanks
    }

}
