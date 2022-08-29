import { Note } from "./note.interface"

export interface NotesConversation {
    uid: number,
    source_id: number,
    conversations: [{
        with_uid: number,
        notes: {
            uid: number,
            nid: number,
            to_type: string,
            to_user_id: number,
            to_id: number,
            description: string,
            date_created: Date|string
        } []
    }]
}