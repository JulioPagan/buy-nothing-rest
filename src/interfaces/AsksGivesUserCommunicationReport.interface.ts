export interface ReportCommunication {
    rid: number;
    name: string;
    c_by: number|""|null;
    v_by: number; 
    start_date: Date|string;
    end_date: Date|string;
    asks: {
        ask: {
            uid: number,
            aid: number,
            type: string,
            description, string,
            start_date: Date,
            end_date: Date,
            extra_zip: number[],
            is_active: boolean,
            date_created: Date
        },
        conversations: []
    } [];
    gives: {
        give: {
            uid: number,
            aid: number,
            type: string,
            description, string,
            start_date: Date,
            end_date: Date,
            extra_zip: number[],
            is_active: boolean,
            date_created: Date
        },
        conversations: []

    }[];
}