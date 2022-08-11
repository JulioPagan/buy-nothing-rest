import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Give } from 'src/interfaces/give.interface';

@Injectable()
export class GivesService {
    private readonly gives: Give[] = [];

    create(give: Give) {
        this.gives.push(give);
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
    update(uid: number, gid: number, give: Give): Give {
        if (!this.gives[gid]) {
            throw new NotFoundException('Give GID not found, cannot UPDATE');
        }else if (uid != this.gives[gid].uid) {
            throw new NotFoundException('Account UID invalid, cannot UPDATE');
        }else if (this.gives[gid].is_active) {
            throw new BadRequestException('Give is NOT active, cannot UPDATE')
        }
        const updatedGive: Give = {
            ...give
        };
        this.gives[gid] = updatedGive;
        return updatedGive;
    }
    delete(uid: number, gid: number): void {
        if (!this.gives[gid]) {
            throw new NotFoundException('Give GID not found, cannot DELETE');
        }else if (uid != this.gives[gid].uid) {
            throw new NotFoundException('Account UID invalid, cannot DELETE');
        }
        this.gives.splice(gid, 1);
    }
    getMyGives(uid: number, is_active?: boolean): Give[] {
        // TO-DO: Process is_active
        if (uid) {
            return this.gives.filter(give => { 
                return give.uid == uid;
            });
        }else {
            throw new NotFoundException('Valid UID required to find account Gives');
        }
    }
    findAll(v_by: number, is_active?): Give[] {
        // TO-DO: Process is_active
        if (v_by) {
            return this.gives.filter(give => { 
                return give.uid == v_by;
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
