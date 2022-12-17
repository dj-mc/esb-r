import React from 'react';

interface INoteFormProps {
  new_note: string;
  add_note(e: React.FormEvent): void;
  note_input_change(e: React.ChangeEvent<HTMLInputElement>): void;
}

const NoteForm = ({
  new_note,
  add_note,
  note_input_change
}: INoteFormProps) => {
  return (
    <form onSubmit={add_note}>
      <input value={new_note} onChange={note_input_change} />
      <button type="submit">Save New Note</button>
    </form>
  );
};

export { NoteForm };
