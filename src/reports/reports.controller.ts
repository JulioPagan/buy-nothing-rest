import { Body, Controller, Get, Post } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { Report } from 'src/interfaces/report.interface';
import { CreateReportDto } from 'src/dto/create-report.dto';

@Controller('reports')
export class ReportsController {
    constructor(private reportsService: ReportsService){}

    @Post()
    async create(@Body() createReportDto: CreateReportDto){
        this.reportsService.create(createReportDto);
    }
    
    @Get()
    async findReports(): Promise<Report[]> {
        return this.reportsService.findAll();
    }
}
