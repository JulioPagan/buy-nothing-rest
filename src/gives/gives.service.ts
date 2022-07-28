import { Injectable, NotFoundException } from '@nestjs/common';
import { Give } from 'src/interfaces/give.interface';

@Injectable()
export class GivesService {
    private readonly gives: Give[] = [];

    create(give: Give) {
        this.gives.push(give);
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
    search(key: string): Give[] {
        const matchingGives: Give[] = {
            ...this.gives
        };
        return matchingGives;
    }

}
