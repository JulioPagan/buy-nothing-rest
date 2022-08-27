export interface ReportCommunication {
    rid: number;
    name: string;
    c_by: number;
    v_by: number; 
    start_date: string;
    end_date: string;
    asks: [];
    gives: [];
    detail: [{zip: number, asks: {total: number, active: number, inactive: number}, gives: {total: number, active: number, inactive: number}}]
}