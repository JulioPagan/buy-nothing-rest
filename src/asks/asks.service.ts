import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAskDto } from 'src/dto/create-ask.dto';
import { Ask } from 'src/interfaces/ask.interface';

@Injectable()
export class AsksService {
    private readonly asks: Ask[] = [];
    private counter = 0;

    create(createAskDto: CreateAskDto): Ask {
        let aid = this.counter;
        const newAsk: Ask = {
            ...createAskDto,
            aid
        };
        this.asks.push(newAsk);
        this.counter ++;
        return newAsk;
    }
    deactivate(uid: number, aid: number): Ask {
        if (uid != this.asks[aid].uid) {
            throw new NotFoundException('Ask AID not found, cannot DEACTIVATE');
        }
        this.asks[aid].is_active = false;
        return this.asks[aid];
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
