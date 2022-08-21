import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query, Res } from '@nestjs/common';
import { NotesService } from './notes.service';
import { Note } from 'src/interfaces/note.interface';
import { CreateNoteDto } from 'src/dto/create-note.dto';

@Controller('notes')
export class NotesController {
    constructor(private notesService: NotesService){}

    @Post()
    create(@Body() createNoteDto: CreateNoteDto, @Res( {passthrough: true}) res){
        let locationHeader = '/notes/' + this.notesService.counter;
        res.header('Location', locationHeader);
        return this.notesService.create(createNoteDto);
    }
    @Put(':nid')
    @HttpCode(HttpStatus.NO_CONTENT)
    updateAskNote(@Param('nid', ParseIntPipe) nid: number, @Body() note: Note): void{
        return this.notesService.updateNote(nid, note);
    }
    @Delete(':nid')
    deleteNote(@Param('uid', ParseIntPipe) uid: number, @Param('aid', ParseIntPipe) aid: number, @Param('nid', ParseIntPipe) nid: number): void {
        return this.notesService.deleteNote(nid);
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
        return this.notesService.searchNotes(query.key, query.start_date, query.end_date);
    }

}
