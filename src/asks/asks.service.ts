import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { AccountsService } from 'src/accounts/accounts.service';
import { CreateAskDto } from 'src/dto/create-ask.dto';
import { Ask } from 'src/interfaces/ask.interface';

@Injectable()
export class AsksService {
    public readonly asks: Ask[] = [];
    public counter: number = 0;
    private Actors = {
        0: "RU",
        1: "RU",
        2: "CSR"
    };

    create(createAskDto: CreateAskDto): Ask {
        if (createAskDto.aid) {
            throw new BadRequestException("Cannot Pre-Select ask AID")
        }
        if (createAskDto.date_created) {
            throw new BadRequestException("Cannot Pre-Select ask date_created");
        }
        if ((createAskDto.uid == null || "") || (createAskDto.type == null || "") || (createAskDto.description == null || "") || (createAskDto.extra_zip == null || "")) {
            throw new BadRequestException("Must enter all required fields");
        }; 

        let aid = this.counter;
        let date = new Date()
        const newAsk: Ask = {
            ...createAskDto,
            aid
        };
        newAsk.date_created = date;
        newAsk.uid = +newAsk.uid;
        newAsk.aid = + newAsk.aid;
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
    update(uid: number, aid: number, ask: Ask): void {
        if (!this.asks[aid]) {
            throw new NotFoundException('Ask AID not found, cannot UPDATE');
        }else if (uid != this.asks[aid].uid) {
            throw new NotFoundException('Account UID invalid, cannot UPDATE');
        }else if (!this.asks[aid].is_active) {
            throw new BadRequestException('Ask is NOT active, cannot UPDATE')
        }
        const updatedAsk: Ask = {
            ...ask
        };
        updatedAsk.date_created = this.asks[aid].date_created;
        this.asks[aid] = updatedAsk;
        this.asks[aid].uid = +this.asks[aid].uid;
        this.asks[aid].aid = +this.asks[aid].aid;
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
    getMyAsks(uid: number, is_active?: string): Ask[] {
        // TO-DO: Process is_active
        if (uid) {
            if (is_active != null) {
                let activeBoolean = is_active == 'true' ? true : false
                if (activeBoolean) {
                    return this.asks.filter(ask => { 
                        return (ask.uid == uid) && ask.is_active;
                    });
                }else if (!activeBoolean) {
                    return this.asks.filter(ask => { 
                        return (ask.uid == uid) && !ask.is_active;
                    });
                }
            }
            return this.asks.filter(ask => { 
                return (ask.uid == uid);
            });
        }else {
            throw new NotFoundException('Valid UID required to find account Asks');
        }
    }
    // REVIEW AND FIX
    findAll(v_by: number, is_active?): Ask[] {
        // TO-DO: Process is_active
        if (v_by) {
            // CSR account returns all asks
            const Actor = this.Actors[v_by];
            if (Actor === "CSR"){
                return this.asks;
            }
            // RU account returns asks visible to them
            return this.asks.filter(ask => {
                if (is_active != null) {
                    return this.asks.filter(ask => { 
                        return (ask.uid == v_by) && ask.is_active;
                    });
                }    
            });
        } else {
            throw new BadRequestException('MUST identify the user requesitng VIEWING access')
        };
    }
    findOne(aid: number): Ask {
        if (!this.asks[aid] || this.asks[aid].aid != aid) {
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
            let askType = ask.type.toLowerCase();
            return askDescription.includes(key.toLowerCase()) || askType.includes(key.toLowerCase())});    
        }
}
