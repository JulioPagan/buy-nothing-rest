import { Injectable } from '@nestjs/common';
import { Report } from 'src/interfaces/report.interface';

@Injectable()
export class ReportsService {
    private readonly reports: Report[] = [];

    create(report: Report) {
        this.reports.push(report);
    }
    findAll(): Report[] {
        return this.reports
    }
}
