export class CreateAskDto {
    uid: number;
    aid: number|null;
    type: string;
    description: string;
    start_date: string;
    end_date: string|null;
    extra_zip: string[]|null;
    is_active: boolean;
    date_created: Date|string|null;
}