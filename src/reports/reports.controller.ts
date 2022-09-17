import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
    constructor(private reportsService: ReportsService){}

    @Get()
    viewReports() {
        return this.reportsService.findAvailable();
    }
    @Get(':rid')
    viewOneReport(
        @Param() param: {rid: string},
        @Query() query?: { c_by?: string, v_by?: string, start_date?: Date, end_date?: Date}) {
        return this.reportsService.findReport(parseInt(param.rid), parseInt(query.c_by), parseInt(query.v_by), query.start_date, query.end_date);
    }

}
