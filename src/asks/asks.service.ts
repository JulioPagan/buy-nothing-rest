import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
        if (!this.asks[aid]) {
            throw new NotFoundException('Ask AID not found, cannot DEACTIVATE');
        } else if (uid != this.asks[aid].uid) {
            throw new NotFoundException('Account UID not found, cannot deactivate');
        }
        this.asks[aid].is_active = false;
        return this.asks[aid];
    } 
    update(uid: number, aid: number, ask: Ask): Ask {
        if (!this.asks[aid]) {
            throw new NotFoundException('Ask AID not found, cannot UPDATE');
        }else if (uid != this.asks[aid].uid) {
            throw new NotFoundException('Account UID invalid, cannot UPDATE');
        }else if (this.asks[aid].is_active) {
            throw new BadRequestException('Ask is NOT active, cannot UPDATE')
        }
        const updatedAsk: Ask = {
            ...ask
        };
        this.asks[aid] = updatedAsk;
        return updatedAsk;
    }
    delete(uid: number, aid: number): void {
        if (!this.asks[aid]) {
            throw new NotFoundException('Ask AID not found, cannot DELETE');
        }else if (uid != this.asks[aid].uid) {
            throw new NotFoundException('Account UID invalid, cannot DELETE');
        }
        this.asks.splice(aid, 1);
    }
    // REVIEW AND FIX
    getMyAsks(uid: number, is_active?: boolean): Ask[] {
        // TO-DO: Process is_active
        if (uid) {
            return this.asks.filter(ask => { 
                return ask.uid == uid;
            });
        }else {
            throw new NotFoundException('Valid UID required to find account Asks');
        }
    }
    // REVIEW AND FIX
    findAll(v_by: number, is_active?): Ask[] {
        if (v_by) {
            return this.asks.filter(ask => { 
                return ask.uid == v_by;
            });

        } else {
            throw new BadRequestException('MUST identify the user requesitng VIEWING access')
        };
    }
    findOne(aid: number): Ask {
        if (!this.asks[aid]) {
            throw new NotFoundException('AID Not Found');
        }

        return this.asks.find(ask => ask.aid === aid);
    }
    // REVIEW AND FIX
    searchAsks(key?: string, start_date?: Date, end_date?: Date): Ask[] {
        if (!key || key === null) {
            return this.asks;
            // throw new BadRequestException('MUST identify the user requesitng VIEWING access')
        }
        return this.asks.filter(ask => { 
            // TO-DO: Process s_date & e_date 
            let askDescription = ask.description.toLowerCase();
            return askDescription.includes(key.toLowerCase()) });    }
}
