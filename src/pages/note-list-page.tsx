import React, { useEffect, useState } from 'react';

import { Note } from '../note-list/note';
import { INote, TNoteList } from '../note-list/note-types';
import { NoteForm } from '../note-list/note-form';
import { note_service } from '../services/note-service';

import { Notification } from '../components/notification';

const NoteList = () => {
  const init_notes: TNoteList = [];
  const [notes_collection, set_notes_collection] = useState(init_notes);
  const [new_note, set_new_note] = useState('');
  const [display_all, set_display_all] = useState(true);

  const [notification, set_notification] = useState('');

  const get_notes_data = () => {
    note_service.get_all().then((init_notes) => {
      set_notes_collection(init_notes);
    });
  };

  useEffect(get_notes_data, []);

  const add_note = (e: React.FormEvent) => {
    e.preventDefault();

    const new_note_obj: INote = {
      id: notes_collection.length + 1,
      content: new_note,
      date: new Date().toISOString(),
      important: false
    };

    note_service
      .create(new_note_obj)
      .then((newly_created_note) => {
        console.log(`Posted ${newly_created_note.content}`);
        set_notes_collection(notes_collection.concat(newly_created_note));
        set_new_note('');
      })
      .catch((error) => {
        console.error(error);
        set_notification('Cannot create this note');
        setTimeout(() => {
          set_notification('');
        }, 5000);
      });
  };

  const find_note = (target_id: number) => {
    return notes_collection.find((note) => note.id === target_id) || null;
  };

  const toggle_importance = (target_id: number) => {
    const target_note = find_note(target_id);

    if (target_note) {
      const new_note = { ...target_note, important: !target_note.important };

      note_service
        .update(target_id, new_note)
        .then((updated_note) => {
          set_notes_collection(
            notes_collection.map((note) =>
              note.id === target_note.id ? updated_note : note
            )
          );
        })
        .catch((error) => {
          console.error(error);
          // Assume note is deleted from db
          set_notification('Cannot affect deleted note');
          setTimeout(() => {
            set_notification('');
          }, 5000);
          set_notes_collection(
            // Remove deleted note from view
            notes_collection.filter((note) => note.id !== target_id)
          );
        });
    }
  };

  const remove_note = (target_id: number) => {
    const target_note = find_note(target_id);
    if (target_note) {
      note_service.delete(target_note.id).catch((err) => console.log(err));
      set_notes_collection(
        notes_collection.filter((note) => note.id !== target_note.id)
      );
    }
  };

  const display_these = display_all
    ? notes_collection
    : notes_collection.filter((note) => note.important);
  const note_input_change = (e: React.ChangeEvent<HTMLInputElement>) => {
    set_new_note(e.target.value);
  };

  return (
    <>
      <Notification message={notification} />
      <NoteForm
        new_note={new_note}
        add_note={add_note}
        note_input_change={note_input_change}
      />

      <button onClick={() => set_display_all(!display_all)}>
        {display_all ? 'All notes' : 'Important notes'}
      </button>

      <ul className="note-list">
        {display_these.map((note: INote) => (
          <Note
            key={note.id}
            note={note}
            toggle_importance={() => toggle_importance(note.id)}
            remove_note={() => remove_note(note.id)}
          />
        ))}
      </ul>
    </>
  );
};

export { NoteList };
