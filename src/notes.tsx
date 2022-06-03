import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ButtonOnClick } from './button-on-click';

export interface INote {
  id: number;
  content: string;
  date: string;
  important: boolean;
}

export type TNoteList = INote[];

const MakeNoteLi = (props: { notes: TNoteList }) => {
  return (
    <>
      {props.notes.map((item: INote) => (
        <li key={item.id}>{item.content}</li>
      ))}
    </>
  );
};

export const Notes = () => {
  const init_notes: TNoteList = [];
  const [notes, set_notes] = useState(init_notes);
  const [new_note, set_new_note] = useState('');
  const [display_all, set_display_all] = useState(true);

  const promise_resolved = (response: {
    data: React.SetStateAction<TNoteList>;
  }): void => {
    console.log('Resolving promise...');
    set_notes(response.data);
  };

  const get_notes_data = () => {
    console.log('Effect occurred');
    axios.get('http://localhost:3001/notes').then(promise_resolved);
  };

  useEffect(get_notes_data, []);

  console.log(`Rendered ${notes.length} notes`);

  const add_note = (e: React.FormEvent) => {
    e.preventDefault();

    const note_obj: INote = {
      id: notes.length + 1,
      content: new_note,
      date: new Date().toISOString(),
      important: Math.random() < 0.5
    };

    axios.post('http://localhost:3001/notes', note_obj).then((response) => {
      console.log(`${response.data}: Posted ${note_obj.content}`);
    });

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
