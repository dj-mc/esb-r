import React from 'react';
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
  return (
    <>
      <h1>Notes</h1>
      <ul>
        <MakeNoteLi notes={props.notes} />
      </ul>
    </>
  );
};
