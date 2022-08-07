import { Injectable, NotFoundException } from '@nestjs/common';
import { Ask } from 'src/interfaces/ask.interface';

@Injectable()
export class AsksService {
    private readonly asks: Ask[] = [];

    create(ask: Ask) {
        this.asks.push(ask);
    }
    deactivate() {

    }
    update() {

    }
    delete() {

    }
    getMyAsks() {

    }
    findAll(): Ask[] {
        return this.asks;
    }
    findOne(aid: number): Ask {
        const ask: Ask = this.asks.find(ask => ask.aid === aid);
        if (!ask) {
            throw new NotFoundException('Ask Not Found');
        }

        return ask;
    }
    searchAsks(key?: string, start_date?: Date, end_date?: Date): Ask[] {
        if (key) {
            return this.asks.filter(ask => { 
                let askDescription = ask.description.toLowerCase();
                return askDescription.includes(key.toLowerCase()) });
        }
        return this.asks;
    }
}
