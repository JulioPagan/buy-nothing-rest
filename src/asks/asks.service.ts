import { Injectable } from '@nestjs/common';
import { Ask } from 'src/interfaces/ask.interface';

@Injectable()
export class AsksService {
    private readonly asks: Ask[] = [];

    create(ask: Ask) {
        this.asks.push(ask);
    }
    findAll(): Ask[] {
        return this.asks
    }
}
