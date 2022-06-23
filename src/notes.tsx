import { note_service } from './notes-api';
import { INote, TNoteList } from './notes-types';
import React, { useEffect, useState } from 'react';
import { ButtonOnClick } from './button-on-click';

export const Notes = () => {
  const init_notes: TNoteList = [];
  const [new_note, set_new_note] = useState('');
  const [notes_collection, set_notes_collection] = useState(init_notes);
  const [display_all, set_display_all] = useState(true);

  const promise_resolved = (response: {
    data: React.SetStateAction<TNoteList>;
  }): void => {
    console.log('Resolving promise...');
    set_notes_collection(response.data);
  };

  const get_notes_data = () => {
    console.log('Effect occurred');
    note_service.getAll().then(promise_resolved);
  };

  useEffect(get_notes_data, []);

  console.log(`Rendered ${notes_collection.length} notes`);

  const add_note = (e: React.FormEvent) => {
    e.preventDefault();

    const note_obj: INote = {
      id: notes_collection.length + 1,
      content: new_note,
      date: new Date().toISOString(),
      important: false
    };

    note_service.create(note_obj).then((response) => {
      console.log(`${response.data}: Posted ${note_obj.content}`);
      set_notes_collection(notes_collection.concat(note_obj));
      set_new_note('');
    });
  };

  const toggle_importance = (target_id: number) => {
    const target_note =
      notes_collection.find((note) => note.id === target_id) || null;
    if (target_note) {
      const new_note = { ...target_note, important: !target_note.important };
      note_service.update(target_id, new_note).then((response) => {
        set_notes_collection(
          notes_collection.map((note) =>
            note.id === target_note.id ? response.data : note
          )
        );
      });
    } else {
      console.log('Note not found');
    }
  };

  const input_change = (e: React.ChangeEvent<HTMLInputElement>) => {
    set_new_note(e.target.value);
  };

  const display_these = display_all
    ? notes_collection
    : notes_collection.filter((note) => note.important);

  return (
    <>
      <h2>Notes</h2>
      <ButtonOnClick
        fn={() => set_display_all(!display_all)}
        text={display_all ? 'all' : 'important'}
      />
      <ul>
        {display_these.map((note: INote) => (
          <li key={note.id}>
            {note.content}
            <ButtonOnClick
              fn={() => toggle_importance(note.id)}
              text={note.important ? 'important' : 'not important'}
            />
          </li>
        ))}
      </ul>
      <form onSubmit={add_note}>
        <input value={new_note} onChange={input_change} />
        <button type="submit">Save New Note</button>
      </form>
    </>
  );
};
