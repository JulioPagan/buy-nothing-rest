import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
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
    findOneAsk(@Param('rid', ParseIntPipe) rid: number): Report {
        return this.reportsService.findOne(rid);
    }

}
