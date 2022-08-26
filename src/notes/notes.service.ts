import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoteDto } from 'src/dto/create-note.dto';
import { Note } from 'src/interfaces/note.interface';
import { NotesConversation } from 'src/interfaces/notes.conversation.interface';

@Injectable()
export class NotesService {
    public readonly notes: Note[] = [];
    private readonly conversations: NotesConversation[] = [];
    public counter: number = 0;

    create(createNoteDto: CreateNoteDto): Note {
        if (createNoteDto.nid) {
            throw new BadRequestException("Cannot Pre-Select thank TID");
        }
        if (createNoteDto.date_created) {
            throw new BadRequestException("Cannot Pre-Select thank date_created");
        }
        if ((createNoteDto.uid == null || "") || (createNoteDto.to_type == null || "") || (createNoteDto.to_user_id == null || "") || (createNoteDto.to_id == null || "") || (createNoteDto.description == null || "")) {
            throw new BadRequestException("Must enter all required fields");
        }; 

        let nid = this.counter;
        let date = new Date();
        const newNote: Note = {
            ...createNoteDto,
            nid
        };
        newNote.date_created = date;
        newNote.uid = +newNote.uid;
        newNote.nid = + newNote.nid;
        newNote.to_id = +newNote.to_id
        newNote.to_user_id = +newNote.to_user_id;
        if (newNote.to_type != 'note') {
            if (this.conversations.find(convo => {return convo.source_id == newNote.to_id})) {
                let index = this.conversations.findIndex(convo => {return convo.source_id == newNote.to_id}); 
                let conversationIndex = this.conversations[index].conversations[this.conversations[index].conversations.findIndex(convo => {return convo.with_uid == newNote.uid})];
                console.log(conversationIndex == undefined);
                if (conversationIndex == undefined) {
                    console.log('creating new note in thread');
                    const newThread = {
                        'with_uid': newNote.uid,
                        'notes': [newNote]
                    }
                    this.conversations[index].conversations.push(newThread);
                    this.conversations[index].conversations[this.conversations[index].conversations.findIndex(convo => {return convo.with_uid == newNote.uid})].notes.push(newNote);    
                } else {
                    this.conversations[index].conversations[this.conversations[index].conversations.findIndex(convo => {return convo.with_uid == newNote.uid})].with_uid = newNote.uid;
                    this.conversations[index].conversations[this.conversations[index].conversations.findIndex(convo => {return convo.with_uid == newNote.uid})].notes.push(newNote);
                }
                console.log('note in conversation', this.conversations[index].conversations);
            }else {
                const newConversation: NotesConversation = {
                    'uid' : newNote.to_user_id,
                    'source_id': newNote.to_id,
                    'conversations' : [{'with_uid' : newNote.uid, 'notes' : [newNote]}]
                }
                this.conversations.push(newConversation);
            }
        }else {
            // Process note reply
        }

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
        updatedNote.uid = +updatedNote.uid;
        updatedNote.nid = + updatedNote.nid;
        updatedNote.to_id = +updatedNote.to_id
        updatedNote.to_user_id = +updatedNote.to_user_id;
        this.notes[nid] = updatedNote;
    }

    deleteNote(nid: number): void {
        if (!this.notes[nid]) {
            throw new NotFoundException('Ask AID not found, cannot DELETE');
        }
        this.notes.splice(nid, 1);
    }
    // Process 
    viewNotes(c_by?: number, v_by?: number, type?: string, agid?: number, key?: string, start_date?: Date, end_date?: Date): Note[] | NotesConversation[] {
        // Process type and v_by
        if (c_by) {
            return this.notes.filter(note => { 
                return note.uid == c_by;
            });
        } else if (key) {
            return this.notes.filter(note => { 
                return note.description.includes(key.toLowerCase()) });
        }
        
        return this.conversations;
    }
    viewNote(nid: number): Note {
        const note: Note = this.notes.find(note => note.uid === nid);

        if (!note) {
            throw new NotFoundException('Note Not Found');
        }
        return note;
    }

}
