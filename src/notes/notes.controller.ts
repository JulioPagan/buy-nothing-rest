import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { NotesService } from './notes.service';
import { Note } from 'src/interfaces/note.interface';
import { CreateNoteDto } from 'src/dto/create-note.dto';

@Controller('notes')
export class NotesController {
    constructor(private notesService: NotesService){}

    @Post()
    create(@Body() createNoteDto: CreateNoteDto){
        this.notesService.create(createNoteDto);
    }
    
    @Get()
    findNotes(): Note[] {
        return this.notesService.findAll();
    }
    // INCOMPLETE TEMPLATE - MUST FIX
    @Get(':key')
    searchGives(@Query() query?: { key?: string, start_date?: Date, end_date?: Date}): Note[] {
        console.log(query);
        return this.notesService.searchNotes(query.key, query.start_date, query.end_date);
    }

}
