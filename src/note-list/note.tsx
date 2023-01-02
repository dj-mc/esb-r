import React from 'react';
import { INote } from './note-types';

const Note = ({
  note,
  toggle_importance,
  remove_note
}: {
  note: INote;
  toggle_importance: () => void;
  remove_note: () => void;
}) => {
  return (
    <li className="note-item">
      {note.content}
      <button onClick={toggle_importance}>
        {note.important ? 'important' : 'not important'}
      </button>
      <button onClick={remove_note}>remove</button>
    </li>
  );
};

export { Note };
