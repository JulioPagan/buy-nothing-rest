import { Test, TestingModule } from '@nestjs/testing';
import { NotesService } from './notes.service';

describe('NotesService', () => {
  let service: NotesService;

  let testNote1 = {
    uid: 0,
    nid: null,
    to_type: 'give',
    to_user_id: 0,
    to_id: 0,
    description: 'this is a test note',
    date_created: null
  }
  let testNote2 = {
    uid: 0,
    nid: null,
    to_type: 'ask',
    to_user_id: 0,
    to_id: 0,
    description: 'this is another test note',
    date_created: null
  }
  let updatedNote = {
    uid: 0,
    nid: 0,
    to_type: 'give',
    to_user_id: 0,
    to_id: 0,
    description: 'this is another test note',
    date_created: null
  }


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotesService],
    }).compile();

    service = module.get<NotesService>(NotesService);
  });


  it('should create a note with NID', () => {
    let createdNote = service.create(testNote1);
    expect(createdNote).toEqual(
      {
        uid: 0,
        nid: null,
        to_type: 'give',
        to_user_id: 0,
        to_id: 0,
        description: 'this is a test note',
        date_created: null
      });
  });


  
});
