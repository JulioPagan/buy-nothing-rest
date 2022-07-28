import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { NotesService } from './notes.service';
import { Note } from 'src/interfaces/note.interface';
import { CreateNoteDto } from 'src/dto/create-note.dto';

@Controller('notes')
export class NotesController {
    constructor(private notesService: NotesService){}

    @Post()
    async create(@Body() createNoteDto: CreateNoteDto){
        this.notesService.create(createNoteDto);
    }
    
    @Get()
    async findNotes(): Promise<Note[]> {
        return this.notesService.findAll();
    }
    // INCOMPLETE TEMPLATE - MUST FIX
    @Get(':key')
    async searchNotes(@Param('key') key: string): Promise<Note[]> {
        return this.notesService.search(key);
    }

}
