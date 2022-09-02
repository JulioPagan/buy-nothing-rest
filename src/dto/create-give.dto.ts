export class CreateGiveDto {
    uid: number;
    gid: number|null;
    type: string;
    description: string;
    start_date: string;
    end_date: string;
    extra_zip: string[]|null;
    is_active: boolean;
    date_created: Date|string|null;
}