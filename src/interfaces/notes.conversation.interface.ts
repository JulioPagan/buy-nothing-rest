import { Note } from "./note.interface"

export interface NotesConversation {
    uid: number,
    source_id: number,
    conversations: [{
        with_uid: number,
        notes: Note [] 
    }]
}