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
    service.create(testNote1);
    service.create(testNote2);
  });


  it('should create a note with NID', () => {
    let createdNote = service.create(testNote1);
    let nid = createdNote.nid;
    let date = createdNote.date_created;
    expect(createdNote).toEqual(
      {
        uid: 0,
        nid: nid,
        to_type: 'give',
        to_user_id: 0,
        to_id: 0,
        description: 'this is a test note',
        date_created: date
      });
  });


  it('should update the pre-existng note with new note', () => {
    service.updateNote(service.notes[0].nid, updatedNote);
    expect(service.notes[0]).toEqual(updatedNote);
  });


  it('should create a note with NID', () => {
    let createdNote = service.create(testNote2);
    let nid = createdNote.nid;
    let date = createdNote.date_created;
    expect(createdNote).toEqual(
      {
        uid: 0,
        nid: nid,
        to_type: 'ask',
        to_user_id: 0,
        to_id: 0,
        description: 'this is another test note',
        date_created: date
      });
  });


  it('should delete the note identified by NID', () => {
    let preDelete = service.notes[0];
    service.deleteNote(service.notes[0].nid);
    expect(preDelete ==service.notes[0]).toEqual(false);
  });


  it('should find all notes in the existing list of notes when the user viewing them is CSR', () => {
    // User #2 is the Customer Service Representative (CSR)
    let allNotesby0 = service.viewNotes(0, 2);
    expect(allNotesby0).toEqual(service.viewNotes(0, 2));
  });

  // Test viewing notes withing specified dates

  // Test viewing Notes as RU


  it('should find one note identified by the NID', () => {
    // User #2 is the Customer Service Representative (CSR)
    let index = 0;
    let firstNote = service.viewNote(index);
    expect(firstNote == service.notes[index]).toEqual(true);
  });


  it('should search all notes that match parameters', () => {
    // User #2 is the Customer Service Representative (CSR)
    let keyNotes = service.viewNotes(null, null, null, null, 'test');
    expect(keyNotes).toEqual(service.viewNotes(0, 2));
  });




});
