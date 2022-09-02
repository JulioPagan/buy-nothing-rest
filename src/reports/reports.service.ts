import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { AsksService } from 'src/asks/asks.service';
import { GivesService } from 'src/gives/gives.service';
import { ReportByZip } from 'src/interfaces/AsksGivesByZipReport.interface';
import { ReportCommunication } from 'src/interfaces/AsksGivesUserCommunicationReport.interface';
import { NotesService } from 'src/notes/notes.service';

@Injectable()
export class ReportsService {
    public reports = [];
    public reportByZip: ReportByZip;
    public communicationReport: ReportCommunication;
    private Actors = {
        0: "RU",
        1: "RU",
        2: "CSR"
    };


    private report1 = {
        'rid': parseInt('1'),
        'name': 'Asks/gives broken down by zip'
    }
    private report2 = {
        'rid': parseInt('2'),
        'name': 'Asks/gives and communications for a user'
    }
    constructor (private asksService: AsksService, private givesService: GivesService, private notesService: NotesService) {
        this.reports.push(this.report1);
        this.reports.push(this.report2);
    }
    findAvailable() {
        return this.reports
    }
    findOne(rid: number, c_by?, v_by?, start_date?, end_date?): ReportByZip | ReportCommunication{
        const selectedReport = this.reports.find(report => report.rid === rid);
        if (selectedReport == null || c_by == null || v_by == null) {
            throw new BadRequestException('Must specify the RID, C_BY, V_BY')
        }

        if (selectedReport == 1) {
            let actor = this.Actors[v_by];
            if (actor != 'CSR') {
                throw new BadRequestException('User requesting view must be a CSR');
            }
            this.reportByZip = {
                rid: rid,
    	        name: "Asks/gives broken down by zip",
                c_by: c_by,
    	        v_by: v_by,
                start_date: start_date,
                end_date: end_date,
                asks: this.asksService.asks.length,
                gives: this.givesService.gives.length,
                detail: []
            }
            this.reportByZip.detail.push();
            return this.reportByZip;
        }else if (selectedReport == 2) {
            let actor = this.Actors[v_by];
            if (actor != 'CSR') {
                throw new BadRequestException('User requesting view must be a CSR');
            }
            this.communicationReport = {
                rid: rid,
                name: "Asks/gives and communications for a user",
                c_by: c_by,
                v_by: v_by,
                start_date: start_date,
                end_date: end_date,
                asks: [],
                gives: []
            }
            this.communicationReport.asks.push();
            this.communicationReport.gives.push();
            return this.communicationReport;
        }else {
            throw new NotFoundException('No report exists with that id');
        }
    }
}
