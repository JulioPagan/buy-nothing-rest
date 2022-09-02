export interface Give {
    uid: number;
    gid: number;
    type: string;
    description: string;
    start_date: string;
    end_date: string;
    extra_zip: string[];
    is_active: boolean;
    date_created: Date|string;
}