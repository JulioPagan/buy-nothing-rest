import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoteDto } from 'src/dto/create-note.dto';
import { Note } from 'src/interfaces/note.interface';

@Injectable()
export class NotesService {
    private readonly notes: Note[] = [];
    public counter = 0;

    create(createNoteDto: CreateNoteDto): Note {
        let nid = this.counter;
        const newNote: Note = {
            ...createNoteDto,
            nid
        };
        newNote.uid = +newNote.uid;
        newNote.nid = + newNote.nid;
        newNote.to_id = +newNote.to_id
        newNote.to_user_id = +newNote.to_user_id;
        this.notes.push(newNote);
        this.counter ++;
        return newNote;
    }

    updateNote(nid: number, note: Note): void {
        if (!this.notes[nid]) {
            throw new NotFoundException('Note NID not found, cannot UPDATE');
        }
        const updatedNote: Note = {
            ...note
        };
        this.notes[nid] = updatedNote;
    }

    deleteNote(nid: number): void {
        if (!this.notes[nid]) {
            throw new NotFoundException('Ask AID not found, cannot DELETE');
        }
        this.notes.splice(nid, 1);
    }
    // Process 
    viewNotes(c_by?: number, v_by?: number, type?: string, agid?: number, key?: string, start_date?: Date, end_date?: Date): Note[] {
        // Process type and v_by
        if (c_by) {
            console.log('processing view Notes');
            return this.notes.filter(note => { 
                return note.uid == c_by;
            });
        } else if (key) {
            console.log('processing search Notes');
            return this.notes.filter(note => { 
                let noteDescription = note.description.toLowerCase();
                return noteDescription.includes(key.toLowerCase()) });
        }
        return this.notes;
    }
    viewNote(nid: number): Note {
        const note: Note = this.notes.find(note => note.uid === nid);

        if (!note) {
            throw new NotFoundException('Note Not Found');
        }
        return note;
    }

}
