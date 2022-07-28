import { Injectable } from '@nestjs/common';
import { Note } from 'src/interfaces/note.interface';

@Injectable()
export class NotesService {
    private readonly notes: Note[] = [];

    create(note: Note) {
        this.notes.push(note);
    }
    findAll(): Note[] {
        return this.notes
    }
    // INCOMPLETE TEMPLATE - MUST FIX
    search(key: string): Note[] {
        const matchingNotes: Note[] = {
            ...this.notes
        };
        return matchingNotes;
    }

}
