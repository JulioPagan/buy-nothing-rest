import { Test, TestingModule } from '@nestjs/testing';
import { NotesService } from './notes.service';

describe('NotesService', () => {
  let service: NotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotesService],
    }).compile();

    service = module.get<NotesService>(NotesService);
  });

  it('should create a note with NID', () => {
    let testNotes = service.create(
      {
        uid: 0,
        nid: null,
        to_type: 'give',
        to_user_id: 1,
        to_id: 0,
        description: 'This is a test Note',
        date_created: null
      }
    );
    expect(testNotes).toEqual(
      {
        uid: 0,
        nid: null,
        to_type: 'give',
        to_user_id: 1,
        to_id: 0,
        description: 'This is a test Note',
        date_created: null
      });
  });
});
