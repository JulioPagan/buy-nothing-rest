import { Body, Controller, Get, Post } from '@nestjs/common';
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
}
