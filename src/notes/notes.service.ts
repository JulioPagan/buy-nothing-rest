import { Injectable } from '@nestjs/common';
import { Note } from 'src/interfaces/note.interface';

@Injectable()
export class NotesService {
    private readonly notes: Note[] = [];

    create(note: Note) {
        this.notes.push(note);
    }
    updateAskNote() {

    }
    updateGiveNote() {

    }
    deleteAskNote() {

    }
    deleteGiveNote() {

    }
    getAskNote() {

    }
    getGiveNote() {
        
    }
    findAll(): Note[] {
        return this.notes
    }
    viewNotes() {
        
    }
    searchNotes(key?: string, start_date?: Date, end_date?: Date): Note[] {
        if (key) {
            return this.notes.filter(note => { 
                let noteDescription = note.description.toLowerCase();
                return noteDescription.includes(key.toLowerCase()) });
        }
        return this.notes;
    }

}
