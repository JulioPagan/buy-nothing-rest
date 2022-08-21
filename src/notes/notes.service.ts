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

    // updateAskNote(uid: number, aid: number, nid: number, note: Note): Note {
    //     if (!this.notes[nid]) {
    //         throw new NotFoundException('Give GID not found, cannot UPDATE');
    //     }else if (uid != this.notes[nid].uid) {
    //         throw new NotFoundException('Account UID invalid, cannot UPDATE');
    //     }else if (aid != this.notes[nid].to_id) {
    //         throw new NotFoundException('Ask ID invalid, cannot UPDATE');
    //     }
    //     const updatedNote: Note = {
    //         ...note
    //     };
    //     this.notes[nid] = updatedNote;
    //     return updatedNote;
    // }

    // updateGiveNote(uid: number, gid: number, nid: number, note: Note): Note {
    //     if (!this.notes[nid]) {
    //         throw new NotFoundException('Note NID not found, cannot UPDATE');
    //     }else if (uid != this.notes[nid].uid) {
    //         throw new NotFoundException('Account UID invalid, cannot UPDATE');
    //     }else if (gid != this.notes[nid].to_id) {
    //         throw new NotFoundException('Give ID invalid, cannot UPDATE');
    //     }
    //     const updatedNote: Note = {
    //         ...note
    //     };
    //     this.notes[nid] = updatedNote;
    //     return updatedNote;
    // }
    deleteNote(nid: number): void {
        if (!this.notes[nid]) {
            throw new NotFoundException('Ask AID not found, cannot DELETE');
        }
        this.notes.splice(nid, 1);
    }

    // deleteAskNote(uid: number, aid: number, nid: number): void {
    //     if (!this.notes[nid]) {
    //         throw new NotFoundException('Ask AID not found, cannot DELETE');
    //     }else if (uid != this.notes[nid].uid) {
    //         throw new NotFoundException('Account UID invalid, cannot DELETE');
    //     }else if (aid != this.notes[nid].to_id) {
    //         throw new NotFoundException('Ask ID invalid, cannot UPDATE');
    //     }
    //     this.notes.splice(nid, 1);
    // }
    // deleteGiveNote(uid: number, gid: number, nid: number) {
    //     if (!this.notes[nid]) {
    //         throw new NotFoundException('Note AID not found, cannot DELETE');
    //     }else if (uid != this.notes[nid].uid) {
    //         throw new NotFoundException('Account UID invalid, cannot DELETE');
    //     }else if (gid != this.notes[nid].to_id) {
    //         throw new NotFoundException('Give ID invalid, cannot DELETE');
    //     }
    //     this.notes.splice(nid, 1);
    // }
    viewNotes(c_by?: number, v_by?: number, type?: string): Note[] {
        // Process type and v_by
        if (c_by) {
            return this.notes.filter(note => { 
                return note.uid == c_by;
            });
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
    searchNotes(key?: string, start_date?: Date, end_date?: Date): Note[] {
        // Process start_date and end_date
        if (key) {
            return this.notes.filter(note => { 
                let noteDescription = note.description.toLowerCase();
                return noteDescription.includes(key.toLowerCase()) });
        }
        return this.notes;
    }

}
