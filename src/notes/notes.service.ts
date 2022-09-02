import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { findIndex } from 'rxjs';
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
                if (conversationIndex == undefined) {
                    const newThread = {
                        'with_uid': newNote.uid,
                        'notes': [{
                            uid: newNote.uid,
                            nid: newNote.nid,
                            to_type: newNote.to_type,
                            to_user_id: newNote.to_user_id,
                            to_id: newNote.to_id,
                            description: newNote.description,
                            date_created: newNote.date_created
                        }]
                    };
                    this.conversations[index].conversations.push(newThread);
                } else {
                    this.conversations[index].conversations[this.conversations[index].conversations.findIndex(convo => {return convo.with_uid == newNote.uid})].with_uid = newNote.uid;
                    this.conversations[index].conversations[this.conversations[index].conversations.findIndex(convo => {return convo.with_uid == newNote.uid})].notes.push(newNote);
                }
            }else {
                const newConversation: NotesConversation = {
                    'uid' : newNote.to_user_id,
                    'source_id': newNote.to_id,
                    'conversations' : [{'with_uid' : newNote.uid, 'notes' : [{
                        uid: newNote.uid,
                        nid: newNote.nid,
                        to_type: newNote.to_type,
                        to_user_id: newNote.to_user_id,
                        to_id: newNote.to_id,
                        description: newNote.description,
                        date_created: newNote.date_created
                    }]
                }]
                };
                this.conversations.push(newConversation);
            }
        }else {
            let conversationIndex = (this.conversations.findIndex(convo => {return (convo.uid == newNote.uid) || (convo.uid == newNote.to_user_id)}));
            let noteReplyIndex: number;
            if ((this.conversations[conversationIndex].conversations.findIndex(note => {return (note.with_uid == newNote.to_user_id)})) != -1) {
                noteReplyIndex = (this.conversations[conversationIndex].conversations.findIndex(note => {return (note.with_uid == newNote.to_user_id)}));
            } else {
                noteReplyIndex = (this.conversations[conversationIndex].conversations.findIndex(note => {return (note.notes.at(-1).nid == newNote.to_id)}));
            }
            this.conversations[conversationIndex].conversations[noteReplyIndex].notes.push(newNote);    
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
        updatedNote.date_created = this.notes[nid].date_created;
        this.notes[nid] = updatedNote;
        let conversationIndex: number;
        let noteReplyIndex: number;

        if (this.conversations.findIndex(convo => {return (convo.uid == updatedNote.to_user_id)}) != -1) {
            conversationIndex = this.conversations.findIndex(convo => {return (convo.uid == updatedNote.to_user_id)})
        } else {
            conversationIndex = this.conversations.findIndex(convo => {return (convo.uid == updatedNote.uid)})
        }

        if (this.conversations[conversationIndex].conversations.findIndex(note => {return (note.with_uid == updatedNote.uid)}) != -1) {
            noteReplyIndex = this.conversations[conversationIndex].conversations.findIndex(note => {return (note.with_uid == updatedNote.uid)})
        } else {
            noteReplyIndex = this.conversations[conversationIndex].conversations.findIndex(note => {return (note.with_uid == updatedNote.to_user_id)})
        }

        if (this.conversations[conversationIndex].conversations[noteReplyIndex].notes.find(note => {return note.nid == updatedNote.nid})) {
            let noteIndex = this.conversations[conversationIndex].conversations[noteReplyIndex].notes.findIndex(note => {return note.nid == updatedNote.nid});
            this.conversations[conversationIndex].conversations[noteReplyIndex].notes[noteIndex] = updatedNote;
        }

    }

    deleteNote(nid: number): void {
        if (!this.notes[nid]) {
            throw new NotFoundException('Ask AID not found, cannot DELETE');
        }
        this.notes.splice(nid, 1);
    }
    // Process 
    viewNotes(c_by?: number, v_by?: number, type?: string, agid?: number, key?: string, start_date?: Date, end_date?: Date): Note[] | NotesConversation[] {
        // Process type, agid and v_by
        if (c_by) {
            if (v_by) {
                // process both c_by && v_by
            }
            return this.conversations.filter(convo => { 
                return convo.uid == c_by;
            });
        } else if (v_by) {
            return this.conversations.map(convo => {
                convo.conversations = convo.conversations.filter(element => element.with_uid == v_by)
                return convo;
            })
        } else if (key) {
            if (start_date) {

            } else if (end_date) {

            } else if (start_date && end_date) {

            }
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
