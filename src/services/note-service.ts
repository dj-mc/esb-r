import axios from 'axios';
import { INote } from '../note-list/note-types';
import { auth_service } from './auth-service';

const notes_url = '/notes/api';

const get_all_notes = async () => {
  const response = await axios.get(notes_url);
  return response.data;
};

const create_note = async (new_note: INote) => {
  const response = await axios.post(
    notes_url,
    new_note,
    auth_service.auth_config(auth_service.token)
  );
  return response.data;
};

const update_note = async (id: number, updated_note: INote) => {
  const response = await axios.put(`${notes_url}/${id}`, updated_note);
  return response.data;
};

const delete_note = async (id: number) => {
  const response = await axios.delete(`${notes_url}/${id}`);
  return response.data;
};

export const note_service = {
  get_all: get_all_notes,
  create: create_note,
  update: update_note,
  delete: delete_note
};
