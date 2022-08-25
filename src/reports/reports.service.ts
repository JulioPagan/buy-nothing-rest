import { Injectable, NotFoundException } from '@nestjs/common';
import { ReportByZip } from 'src/interfaces/AsksGivesByZipReport.interface';
import { ReportCommunication } from 'src/interfaces/AsksGivesUserCommunication.interface';

@Injectable()
export class ReportsService {
    public readonly reports = [];
    public readonly reportByZip: ReportByZip;
    public readonly communicationReport: ReportCommunication;


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
    findAvailable() {
        return this.reports
    }
    findOne(rid: number, c_by?, v_by?, start_date?, end_date?): ReportByZip | ReportCommunication{
        const selectedReport = this.reports.find(report => report.rid === rid);
        if (!selectedReport) {
            throw new NotFoundException('you must specify a Report to generate');
        }else if (selectedReport == 1) {
            return this.reportByZip;
        }else if (selectedReport == 2) {
            return this.communicationReport;
        }else {
            throw new NotFoundException('No report identifiable by that id');
        }
    }

}
