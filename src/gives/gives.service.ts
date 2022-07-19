import { Injectable } from '@nestjs/common';
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
}
