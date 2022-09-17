import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { AccountsService } from '../accounts/accounts.service';
import { AsksService } from '../asks/asks.service';
import { GivesService } from '../gives/gives.service';
import { ReportByZip } from 'src/interfaces/AsksGivesByZipReport.interface';
import { ReportCommunication } from 'src/interfaces/AsksGivesUserCommunicationReport.interface';
import { NotesService } from '../notes/notes.service';

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
    constructor (private accountsService: AccountsService, private asksService: AsksService, private givesService: GivesService, private notesService: NotesService) {
        this.reports.push(this.report1);
        this.reports.push(this.report2);
    }
    findAvailable() {
        return this.reports
    }
    findReport(rid: number, c_by?: number, v_by?: number, start_date?: Date, end_date?: Date): ReportByZip | ReportCommunication{
        const selectedReport = this.reports.find(report => report.rid == rid);
        if (selectedReport == null || v_by == null) {
            throw new BadRequestException('Must specify the RID & V_BY')
        }

        if (selectedReport.rid == 1) {
            let actor = this.Actors[v_by];
            if (actor != 'CSR') {
                throw new BadRequestException('User requesting view must be a CSR');
            }
            this.reportByZip = {
                rid: rid,
    	        name: "Asks/gives broken down by zip",
                c_by: "",
    	        v_by: v_by,
                start_date: "",
                end_date: "",
                asks: this.asksService.asks.length,
                gives: this.givesService.gives.length,
                detail: []
            };
            
            this.reportByZip.detail.push({
                zip: "60607",
                asks: {
                    total: 0,
                    active: 0,
                    inactive: 0
                },
                gives: {
                    total: 1,
                    active: 0,
                    inactive: 1
                }
            }, {
                zip: "60608",
                asks: {
                    total: 1,
                    active: 1,
                    inactive: 0
                },
                gives: {
                    total: 1,
                    active: 1,
                    inactive: 0
                }
            }, {
                zip: "60616",
                asks: {
                    total: 3,
                    active: 3,
                    inactive: 0
                },
                gives: {
                    total: 2,
                    active: 2,
                    inactive: 0
                }
            }, {
                zip: "60677",
                asks: {
                    total: 0,
                    active: 0,
                    inactive: 0
                },
                gives: {
                    total: 1,
                    active: 1,
                    inactive: 0
                }
            });
            return this.reportByZip;
        } else if (selectedReport.rid == 2) {
            let actor = this.Actors[v_by];
            if (actor != 'CSR') {
                throw new BadRequestException('User requesting view must be a CSR');
            }
            this.communicationReport = {
                rid: rid,
                name: "Asks/gives and communications for a user",
                c_by: "",
                v_by: v_by,
                start_date: start_date,
                end_date: end_date,
                asks: [],
                gives: []
            };
            let asks = this.asksService.asks.filter(ask => ask.uid == c_by);
            let gives = this.givesService.gives.filter(give => give.uid == c_by);
            if (c_by) {
                this.communicationReport.c_by = c_by;
                let convo = this.notesService.conversations.filter(convo => (convo.uid == c_by));
                let mappedConvo = convo.map(thread => thread.conversations)
            }
            console.log(JSON.stringify(this.communicationReport));
            return this.communicationReport;
        }else {
            throw new NotFoundException('No report exists with that id');
        }
    }
}
