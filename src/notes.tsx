import React from 'react';
import { INote, INoteList } from './notes-object-list';

const MakeNoteLi = (props: { notes: INoteList }) => {
  return (
    <>
      {props.notes.map((item: INote) => (
        <li key={item.id}>{item.content}</li>
      ))}
    </>
  );
};

export const Notes = (props: { notes: INoteList }) => {
  return (
    <>
      <h1>Notes</h1>
      <ul>
        <MakeNoteLi notes={props.notes} />
      </ul>
    </>
  );
};
