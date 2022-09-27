import axios from 'axios';
import { INote } from './notes-types';

const notes_url = '/notes/api';

const get_all_notes = () => {
  return axios.get(notes_url).then((response) => response.data);
};

const create_new_note = (new_note: INote) => {
  return axios.post(notes_url, new_note).then((response) => response.data);
};

const update_target_note = (id: number, updated_note: INote) => {
  return axios
    .put(`${notes_url}/${id}`, updated_note)
    .then((response) => response.data);
};

const delete_target_note = (id: number) => {
  return axios.delete(`${notes_url}/${id}`).then((response) => response.data);
};

export const note_service = {
  getAll: get_all_notes,
  create: create_new_note,
  update: update_target_note,
  delete: delete_target_note
};
