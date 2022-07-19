export class CreateNoteDto {
    uid: number;
    nid: number;
    to_type: string;
    to_user_id: number;
    to_id: number;
    description: string;
    date_created: string;
}