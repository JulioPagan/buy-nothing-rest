import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { Report } from 'src/interfaces/report.interface';
import { CreateReportDto } from 'src/dto/create-report.dto';

@Controller('reports')
export class ReportsController {
    constructor(private reportsService: ReportsService){}

    @Get()
    findReports(): Report[] {
        return this.reportsService.findAll();
    }
    @Get(':rid')
    findOneReport(
        @Param() param: {rid: number},
        @Query() query?: { c_by?: string, v_by?: string, start_date?: Date, end_date?: Date}
        ) {
        return this.reportsService.findOne(param.rid, query.c_by, query.v_by, query.start_date, query.end_date);
    }

}
