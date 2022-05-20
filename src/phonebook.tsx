import React, { useState } from 'react';
import { IContact, TContactList } from './phonebook-data';

const MakeContactLi = (props: { contacts: TContactList }) => {
  return (
    <>
      {props.contacts.map((contact: IContact) => (
        <li key={contact.name}>{contact.name}</li>
      ))}
    </>
  );
};

export const Phonebook = (props: { contacts: TContactList }) => {
  const [contacts, set_contacts] = useState(props.contacts);
  const [new_name, set_new_name] = useState('');

  const add_contact = (e: Event) => {
    e.preventDefault();

    const contact_obj: IContact = {
      name: new_name
    };

    set_contacts(contacts.concat(contact_obj));
    set_new_name('');
  };

  const input_change = (e: Event & { target: HTMLInputElement }) => {
    set_new_name(e.target.value);
  };

  return (
    <>
      <h2>Phonebook</h2>
      <form onSubmit={add_contact}>
        Name: <input value={new_name} onChange={input_change} />
        <br />
        <button type="submit">Add New Contact</button>
      </form>
      <h2>Your Contacts</h2>
      <ul>
        <MakeContactLi contacts={contacts} />
      </ul>
    </>
  );
};
