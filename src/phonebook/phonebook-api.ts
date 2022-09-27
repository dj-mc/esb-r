import axios from 'axios';
import { IContact } from './phonebook-types';

const phonebook_url = '/phonebook/api';

const get_all_contacts = () => {
  return axios.get(phonebook_url).then((response) => response.data);
};

const create_new_contact = (new_contact: IContact) => {
  return axios
    .post(phonebook_url, new_contact)
    .then((response) => response.data);
};

const update_target_contact = (id: number, updated_contact: IContact) => {
  return axios
    .put(`${phonebook_url}/${id}`, updated_contact)
    .then((response) => response.data);
};

const delete_target_contact = (contact_id: number) => {
  return axios
    .delete(`${phonebook_url}/${contact_id}`)
    .then((response) => response.data);
};

export const phonebook_service = {
  getAll: get_all_contacts,
  create: create_new_contact,
  update: update_target_contact,
  delete: delete_target_contact
};
