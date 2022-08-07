import { Injectable, NotFoundException } from '@nestjs/common';
import { Give } from 'src/interfaces/give.interface';

@Injectable()
export class GivesService {
    private readonly gives: Give[] = [];

    create(give: Give) {
        this.gives.push(give);
    }
    deactivate() {

    }
    update() {

    }
    delete() {

    }
    viewMyGives() {

    }
    findAll(): Give[] {
        return this.gives
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
