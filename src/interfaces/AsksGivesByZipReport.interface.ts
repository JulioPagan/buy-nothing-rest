export interface ReportByZip {
    rid: number;
    name: string;
    c_by: number|""|null;
    v_by: number; 
    start_date: Date|""|null;
    end_date: Date|""|null;
    asks: number;
    gives: number;
    detail: {
        zip: string,
        asks: {
            total: number,
            active: number,
            inactive: number
        },
        gives: {
            total: number,
            active: number,
            inactive: number
        }
    } []
}