import React, { useState } from 'react';
import { ButtonOnClick } from './button-on-click';
import { INote, TNoteList } from './notes-data';

const MakeNoteLi = (props: { notes: TNoteList }) => {
  return (
    <>
      {props.notes.map((item: INote) => (
        <li key={item.id}>{item.content}</li>
      ))}
    </>
  );
};

export const Notes = (props: { notes: TNoteList }) => {
  const [notes, set_notes] = useState(props.notes);
  const [new_note, set_new_note] = useState('');
  const [display_all, set_display_all] = useState(true);

  const add_note = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Clicked me', e.target);

    const note_obj = {
      id: notes.length + 1,
      content: new_note,
      date: new Date().toISOString(),
      important: Math.random() < 0.5
    };

    set_notes(notes.concat(note_obj));
    set_new_note('');
  };

  const input_change = (e: React.ChangeEvent<HTMLInputElement>) => {
    set_new_note(e.target.value);
  };

  const display_these = display_all
    ? notes
    : notes.filter((note) => note.important);

  return (
    <>
      <h2>Notes</h2>
      <ButtonOnClick
        fn={() => set_display_all(!display_all)}
        text={display_all ? 'important' : 'all'}
      />
      <ul>
        <MakeNoteLi notes={display_these} />
      </ul>
      <form onSubmit={add_note}>
        <input value={new_note} onChange={input_change} />
        <button type="submit">Save New Note</button>
      </form>
    </>
  );
};
