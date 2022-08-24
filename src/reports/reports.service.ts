import { Injectable, NotFoundException } from '@nestjs/common';
import { Report } from 'src/interfaces/report.interface';

@Injectable()
export class ReportsService {
    public readonly reports = [];
    private report1 = {
        'rid': parseInt('1'),
        'name': 'Asks/gives broken down by zip'
    }
    private report2 = {
        'rid': parseInt('2'),
        'name': 'Asks/gives and communications for a user'
    }
    constructor () {
        this.reports.push(this.report1);
        this.reports.push(this.report2);
    }
    findAvailable(): Report[] {
        return this.reports
    }
    findOne(rid: number, c_by?, v_by?, start_date?, end_date?): Report {
        const report: Report = this.reports.find(report => report.rid === rid);
        if (!report) {
            throw new NotFoundException('Report Not Found');
        }

        return report;
    }

}
