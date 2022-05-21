import React, { useState } from 'react';
import { IContact, TContactList } from './phonebook-data';

const MakeContactLi = (props: { contacts: TContactList }) => {
  return (
    <>
      <table>
        <caption>Your contacts</caption>

        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Number</th>
          </tr>
        </thead>

        <tbody>
          {props.contacts.map((contact: IContact) => (
            <tr key={contact.name}>
              <td>{contact.name}</td>
              <td>{contact.phone_no}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export const Phonebook = (props: { contacts: TContactList }) => {
  const [contacts, set_contacts] = useState(props.contacts);
  const [new_name, set_new_name] = useState('');
  const [new_phone_no, set_new_phone_no] = useState('');
  const [search_this, set_search_this] = useState('');

  const add_contact = (e: React.FormEvent) => {
    e.preventDefault();

    let found_duplicate = false;
    contacts.map((each) => {
      if (each.name === new_name || each.phone_no === new_phone_no) {
        found_duplicate = true;
      }
    });

    if (!found_duplicate) {
      const contact_obj: IContact = {
        name: new_name,
        phone_no: new_phone_no
      };

      set_contacts(contacts.concat(contact_obj));
      set_new_name('');
      set_new_phone_no('');
    } else {
      alert(`${new_name} already exists.`);
    }
  };

  type TEvent = React.ChangeEvent<HTMLInputElement>;

  const input_change_name = (e: TEvent) => {
    set_new_name(e.target.value);
  };

  const input_change_phone_no = (e: TEvent) => {
    set_new_phone_no(e.target.value);
  };

  const input_search_this = (e: TEvent) => {
    set_search_this(e.target.value);
  };

  return (
    <>
      <h2>Phonebook</h2>

      <input value={search_this} onChange={input_search_this} />

      <form onSubmit={add_contact}>
        Name: <input value={new_name} onChange={input_change_name} />
        <br />
        Number: <input value={new_phone_no} onChange={input_change_phone_no} />
        <br />
        <button type="submit">Add New Contact</button>
      </form>

      <ul>
        <MakeContactLi contacts={contacts} />
      </ul>
    </>
  );
};
