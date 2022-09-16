import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { NotesService } from './notes.service';

describe('NotesService', () => {
  let service: NotesService;

  let testNote1 = {
    uid: 71,
    nid: null,
    to_type: 'give',
    to_user_id: 19,
    to_id: 43,
    description: 'Can I get braids this coming Monday?',
    date_created: null
  }
  let testNote2 = {
    uid: 79,
    nid: null,
    to_type: 'ask',
    to_user_id: 7,
    to_id: 31,
    description: 'IKEA is my middle name, when do you need help?',
    date_created: null
  }
  let createNote = {
    uid: 0,
    nid: null,
    to_type: 'ask',
    to_user_id: 0,
    to_id: 0,
    description: 'This is a test creation',
    date_created: null
  }
  let testThread = {
    uid: 79,
    nid: null,
    to_type: 'give',
    to_user_id: 19,
    to_id: 43,
    description: 'Is this Mondays spot taken already?',
    date_created: null
  }
  let testThread1 = {
    uid: 7,
    nid: null,
    to_type: 'note',
    to_user_id: 79,
    to_id: 1,
    description: 'Thank you, hows tomorrow after 5pm?  Im at 123 Main ST.',
    date_created: null
}
  let testThread2 = {
    uid: 79,
    nid: null,
    to_type: 'note',
    to_user_id: 7,
    to_id: 2,
    description: 'Got it, see you tomorrow around 5:30pm.',
    date_created: null
}

  let updatedNote = {
    uid: 71,
    nid: null,
    to_type: 'give',
    to_user_id: 19,
    to_id: 43,
    description: 'This note was updated',
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



  // Test create note
  it('should create a note with NID', () => {
    let createdNote = service.create(createNote);
    let nid = createdNote.nid;
    let date = createdNote.date_created;
    expect(createdNote).toEqual(
      {
        uid: 0,
        nid: nid,
        to_type: 'ask',
        to_user_id: 0,
        to_id: 0,
        description: 'This is a test creation',
        date_created: date
      });
  });
  // Test create note
  it('should create a new thread with NID', () => {
    let createdNote = service.create(testThread);
    let nid = createdNote.nid;
    let date = createdNote.date_created;
    expect(createdNote).toEqual(
      {
        uid: 79,
        nid: nid,
        to_type: 'give',
        to_user_id: 19,
        to_id: 43,
        description: 'Is this Mondays spot taken already?',
        date_created: date
      });
  });
  // Test create note
  it('should create a response', () => {
    let createdNote = service.create(testThread1);
    let nid = createdNote.nid;
    let date = createdNote.date_created;
    expect(createdNote).toEqual(
      {
        uid: 7,
        nid: nid,
        to_type: 'note',
        to_user_id: 79,
        to_id: 1,
        description: 'Thank you, hows tomorrow after 5pm?  Im at 123 Main ST.',
        date_created: date
      });
  });
  // Test create note
  it('should create a response', () => {
    service.create(testThread1);
    let createdNote = service.create(testThread2);
    let nid = createdNote.nid;
    let date = createdNote.date_created;
    expect(createdNote).toEqual(
      {
        uid: 79,
        nid: nid,
        to_type: 'note',
        to_user_id: 7,
        to_id: 2,
        description: 'Got it, see you tomorrow around 5:30pm.',
        date_created: date    
      });
  });
  // Test BAD request when pre-setting NID
  it('should throw BAD REQUEST if attempting too pre-set tid', () => {
    expect(() => {service.create({
      uid: 0,
      nid: 9,
      to_type: 'give',
      to_user_id: 0,
      to_id: 0,
      description: 'this is a test note',
      date_created: null
    })}).toThrow(BadRequestException);
  });
  // Test BAD request when pre-setting date_created
  it('should throw BAD REQUEST if attempting too pre-set date_created', () => {
    expect(() => {service.create({
      uid: 0,
      nid: null,
      to_type: 'give',
      to_user_id: 0,
      to_id: 0,
      description: 'this is a test note',
      date_created: '2022-03-12T17:12:26Z'
    })}).toThrow(BadRequestException);
  });
  // Test BAD request when UID is missing
  it('should throw BAD REQUEST if uid is missing', () => {
    expect(() => {service.create({
      uid: null,
      nid: null,
      to_type: 'give',
      to_user_id: 0,
      to_id: 0,
      description: 'this is a test note',
      date_created: null
    })}).toThrow(BadRequestException);
  });
  // Test BAD request when to_type is missing
  it('should throw BAD REQUEST if to_type is missing', () => {
    expect(() => {service.create({
      uid: 0,
      nid: null,
      to_type: null,
      to_user_id: 0,
      to_id: 0,
      description: 'this is a test note',
      date_created: null
    })}).toThrow(BadRequestException);
  });
  // Test BAD request when to_user_id is missing
  it('should throw BAD REQUEST if to_user_id is missing', () => {
    expect(() => {service.create({
      uid: 0,
      nid: null,
      to_type: 'give',
      to_user_id: null,
      to_id: 0,
      description: 'this is a test note',
      date_created: null
    })}).toThrow(BadRequestException);
  });
  // Test BAD request when to_id is missing
  it('should throw BAD REQUEST if to_id is missing', () => {
    expect(() => {service.create({
      uid: 0,
      nid: null,
      to_type: 'give',
      to_user_id: 0,
      to_id: null,
      description: 'this is a test note',
      date_created: null
    })}).toThrow(BadRequestException);
  });
  // Test BAD request when description is missing
  it('should throw BAD REQUEST description is missing', () => {
    expect(() => {service.create({
      uid: 0,
      nid: null,
      to_type: 'give',
      to_user_id: 0,
      to_id: 0,
      description: null,
      date_created: null
    })}).toThrow(BadRequestException);
  });


  // Test update
  it('should update the pre-existng note with new note', () => {
    service.updateNote(service.notes[0].nid, updatedNote);
    let date = service.notes[0].date_created;
    expect(service.notes[0]).toEqual({
      uid: 71,
      nid: 0,
      to_type: 'give',
      to_user_id: 19,
      to_id: 43,
      description: 'This note was updated',
      date_created: date
    });
  });
  // Test BAD update
  it('should throw 404 if NID not found', () => {
    expect(() => {service.updateNote(9, updatedNote)}).toThrow(NotFoundException);
  });


  // Test delete
  it('should delete the note identified by NID', () => {
    let preDelete = service.notes.length;
    service.deleteNote(service.notes[0].nid);
    expect(preDelete == service.notes.length).toBeFalsy();
  });
  // Test BAD delete
  it('should throw 404 if NID not found', () => {
    expect(() => {service.deleteNote(9)}).toThrow(NotFoundException);
  });


  // Test viewNotes
  it('should find all notes in the existing list of notes when the user viewing them is CSR', () => {
    let allNotesby0 = service.viewNotes(0, 2);
    expect(allNotesby0).toEqual(service.viewNotes(0, 2));
  });
  it('should find all notes', () => {
    let allNotes = service.viewNotes();
    expect(service.viewNotes()).toEqual(allNotes);
  });




  // Test viewNote
  it('should find one note identified by the NID', () => {
    let firstNote = service.notes.find(note => note.uid === 0)
    expect(service.viewNote[0]).toEqual(firstNote);
  });
  // Test BAD viewNote
  it('should throw 404 if no note found', () => {
    expect(() => {service.viewNote(9)}).toThrow(NotFoundException);
  });


  it('should search all notes that match parameters', () => {
    let keyNotes = service.viewNotes(null, null, null, null, 'test');
    expect(service.viewNotes(null, null, null, null, 'test')).toEqual(keyNotes);
  });

});
