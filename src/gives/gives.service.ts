import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { AccountsService } from '../accounts/accounts.service';
import { CreateGiveDto } from 'src/dto/create-give.dto';
import { Give } from 'src/interfaces/give.interface';

@Injectable()
export class GivesService {
    public readonly gives: Give[] = [];
    public counter: number = 0;
    private Actors = {
        0: "RU",
        1: "RU",
        2: "CSR"
    };

    constructor (private accountsService: AccountsService){}

    create(createGiveDto: CreateGiveDto): Give {
        if (createGiveDto.gid) {
            throw new BadRequestException("Cannot Pre-Select give GID")
        }
        if (createGiveDto.date_created) {
            throw new BadRequestException("Cannot Pre-Select give date_created");
        }
        if ((createGiveDto.uid == null || "") || (createGiveDto.type == null || "") || (createGiveDto.description == null || "")) {
            throw new BadRequestException("Must enter all required fields");
        }; 

        let gid = this.counter;
        let date = new Date();
        const newGive: Give = {
            ...createGiveDto,
            gid
        };
        newGive.date_created = date;
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
        if (v_by != null) {
            // CSR account returns all asks
            const Actor = this.Actors[v_by];
            if (Actor === "CSR"){
                if (is_active) { 
                    let activeBoolean = is_active == 'true' ? true : 'false' ? false : null
                    if (activeBoolean) {
                        return this.gives.filter(give => { 
                            return give.is_active == true;
                        });
                    }else if (!activeBoolean) {
                        return this.gives.filter(give => { 
                            return give.is_active == false;
                        });
                    }                
                }  
                // if no active parameter is given, return ALL gives  
                return this.gives;
            }
            // RU account returns asks visible to them
            return this.gives.filter(give => {
                let visibleAccountIndex = this.accountsService.accounts.findIndex(account => account.uid == v_by);
                let visibleZip = this.accountsService.accounts[visibleAccountIndex].address.zip
                return give.uid == v_by || give.extra_zip.includes(visibleZip);
            })
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
            if (start_date) {
                if (end_date) {
                    return this.gives.filter(give => { 
                        let giveDescription = give.description.toLowerCase();
                        let giveType = give.type.toLowerCase();    
                    return (giveDescription.includes(key.toLowerCase()) || giveType.includes(key.toLowerCase())) && ((give.date_created > start_date) && (give.date_created < end_date))});
                }
                return this.gives.filter(give => { 
                    let giveDescription = give.description.toLowerCase();
                    let giveType = give.type.toLowerCase();    
                return (giveDescription.includes(key.toLowerCase()) || giveType.includes(key.toLowerCase())) && (give.date_created > start_date)});
            } else if (end_date) {
                return this.gives.filter(give => { 
                    let giveDescription = give.description.toLowerCase();
                    let giveType = give.type.toLowerCase();    
                return (giveDescription.includes(key.toLowerCase()) || giveType.includes(key.toLowerCase())) && (give.date_created < end_date)});
            }

            return this.gives.filter(give => { 
                let giveDescription = give.description.toLowerCase();
                return giveDescription.includes(key.toLowerCase()) });
        }
        return this.gives;
    }

}
