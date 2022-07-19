export class CreateAskDto {
    uid: number;
    aid: number;
    type: string;
    description: string;
    start_date: string;
    end_date: string;
    extra_zip: [number, number];
    is_active: boolean;
    date_created: string;
}