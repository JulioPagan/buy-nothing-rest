import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
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
    @Get(':nid')
    viewNote(@Param('nid', ParseIntPipe) nid: number): Note {
        return this.notesService.viewNote(nid);
    }
    @Get()
    viewNotes(): Note[] {
        return this.notesService.viewNotes();
    }
    // INCOMPLETE TEMPLATE - MUST FIX
    @Get()
    searchGives(@Query() query?: { key?: string, start_date?: Date, end_date?: Date}): Note[] {
        console.log(query);
        return this.notesService.searchNotes(query.key, query.start_date, query.end_date);
    }

}
