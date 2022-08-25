export interface ReportByZip {
    rid: number;
    c_by: number;
    v_by: number; 
    start_date: string;
    end_date: string;
    asks: number;
    gives: number;
    detail: [{zip: number, asks: {total: number, active: number, inactive: number}, gives: {total: number, active: number, inactive: number}}]
}