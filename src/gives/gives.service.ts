import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { AccountsService } from 'src/accounts/accounts.service';
import { CreateGiveDto } from 'src/dto/create-give.dto';
import { Give } from 'src/interfaces/give.interface';

@Injectable()
export class GivesService {
    private readonly gives: Give[] = [];
    public counter = 0;

    create(createGiveDto: CreateGiveDto): Give {
        let gid = this.counter;
        const newGive: Give = {
            ...createGiveDto,
            gid
        };
        newGive.uid = +newGive.uid;
        newGive.gid = + newGive.gid;
        this.gives.push(newGive);
        this.counter ++;
        return newGive;
    }
    deactivateGive(uid: number, gid: number): Give {
        if (!this.gives[gid]) {
            throw new NotFoundException('Give GID not found, cannot DEACTIVATE');
        } else if (uid != this.gives[gid].uid) {
            throw new NotFoundException('Account UID not found, cannot deactivate');
        }
        this.gives[gid].is_active = false;
        return this.gives[gid];
    }
    update(uid: number, gid: number, give: Give): void {
        if (!this.gives[gid]) {
            throw new NotFoundException('Give GID not found, cannot UPDATE');
        }else if (uid != this.gives[gid].uid) {
            throw new NotFoundException('Account UID invalid, cannot UPDATE');
        }else if (!this.gives[gid].is_active) {
            throw new BadRequestException('Give is NOT active, cannot UPDATE')
        }
        const updatedGive: Give = {
            ...give
        };
        this.gives[gid] = updatedGive;
        this.gives[gid].uid = +this.gives[gid].uid;
        this.gives[gid].gid = +this.gives[gid].gid;

    }
    delete(uid: number, gid: number): void {
        if (!this.gives[gid]) {
            throw new NotFoundException('Give GID not found, cannot DELETE');
        }else if (uid != this.gives[gid].uid) {
            throw new NotFoundException('Account UID invalid, cannot DELETE');
        }
        this.gives.splice(gid, 1);
    }
    getMyGives(uid: number, is_active?: string): Give[] {
        // TO-DO: Process is_active
        if (uid) {
            if (is_active != null) {
                let activeBoolean = is_active == 'true' ? true : false
                if (activeBoolean) {
                    return this.gives.filter(give => { 
                        return (give.uid == uid) && give.is_active;
                    });
                }else if (!activeBoolean) {
                    return this.gives.filter(give => { 
                        return (give.uid == uid) && !give.is_active;
                    });
                }
            }
            return this.gives.filter(give => { 
                return give.uid == uid;
            });
        }else {
            throw new NotFoundException('Valid UID required to find account Gives');
        }
    }
    findAll(v_by: number, is_active?: string): Give[] {
        // TO-DO: Process is_active
        if (v_by) {
            // CSR account returns all asks
            const Actor = AccountsService.Actors[v_by];
            if (Actor === "CSR"){
                if (is_active != null) {
                    let isTrue = (is_active == 'true');
                    let isFalse = (is_active == 'false');
                    if (!isTrue || !isFalse) {
                        return this.gives;
                    }
    
                    let activeBoolean = is_active == 'true' ? true : false
                    if (activeBoolean) {
                        return this.gives.filter(give => { 
                            return (give.uid == v_by) && give.is_active;
                        });
                    }else if (!activeBoolean) {
                        return this.gives.filter(give => { 
                            return (give.uid == v_by) && !give.is_active;
                        });
                    }                
                }    
                return this.gives;
            }
            // RU account returns asks visible to them
            return this.gives.filter(give => {
                if (is_active != null) {
                    let isTrue = (is_active == 'true');
                    let isFalse = (is_active == 'false');
                    if (!isTrue || !isFalse) {
                        console.log('excuting empty activity');
                        return this.gives.filter(give => { 
                            return (give.uid == v_by);
                        });
                    }
                    let activeBoolean = is_active == 'true' ? true : false
                    if (activeBoolean) {
                        return this.gives.filter(give => { 
                            return (give.uid == v_by) && give.is_active;
                        });
                    }else if (!activeBoolean) {
                        return this.gives.filter(give => { 
                            return (give.uid == v_by) && !give.is_active;
                        });
                    }                
                }    
            });
        } else {
            throw new BadRequestException('MUST identify the user requesitng VIEWING access')
        };
    }
    findOne(gid: number): Give {
        const give: Give = this.gives.find(give => give.gid === gid);
        if (!give) {
            throw new NotFoundException('Give Not Found');
        }

        return give;
    }
    searchGives(key?: string, start_date?: Date, end_date?: Date): Give[] {
        if (key) {
            return this.gives.filter(give => { 
                let giveDescription = give.description.toLowerCase();
                return giveDescription.includes(key.toLowerCase()) });
        }
        return this.gives;
    }

}
