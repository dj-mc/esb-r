import React, { useEffect, useState } from 'react';
import { ButtonOnClick } from './button-on-click';
import { IContact, TContactList } from './phonebook-types';
import { phonebook_service } from './phonebook-api';

const DisplaySearch = (props: {
  search_query: string;
  all_contacts: TContactList;
  remove_contact: CallableFunction;
}) => {
  const searched_contacts: TContactList = [];
  props.all_contacts.map((each: IContact) => {
    const found = each.name
      .toLowerCase()
      .includes(props.search_query.toLowerCase());
    if (found) {
      searched_contacts.push(each);
    }
  });
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
          {searched_contacts.map((contact: IContact) => (
            <tr key={contact.id}>
              <td>{contact.name}</td>
              <td>{contact.phone_number}</td>

              <td>
                <ButtonOnClick
                  fn={() => {
                    props.remove_contact(contact.id);
                  }}
                  text={'Delete Contact'}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export const Phonebook = () => {
  const init_contacts: TContactList = [];
  const [all_contacts, set_all_contacts] = useState(init_contacts);
  const [new_name, set_new_name] = useState('');
  const [new_phone_number, set_new_phone_number] = useState('');
  const [search_query, set_search_query] = useState('');

  useEffect(() => {
    phonebook_service.getAll().then((init_phonebook) => {
      set_all_contacts(init_phonebook);
    });
  }, []);

  const add_contact = (e: React.FormEvent) => {
    e.preventDefault();

    let found_duplicate = false;
    all_contacts.map((each) => {
      if (each.name === new_name || each.phone_number === new_phone_number) {
        found_duplicate = true;
      }
    });

    if (!found_duplicate) {
      const new_contact: IContact = {
        name: new_name,
        phone_number: new_phone_number,
        id: all_contacts.length + 1
      };

      phonebook_service.create(new_contact).then((newly_created_contact) => {
        set_all_contacts(all_contacts.concat(newly_created_contact));
        set_new_name('');
        set_new_phone_number('');
      });
    } else {
      alert(`${new_name} already exists.`);
    }
  };

  const remove_contact = (contact_id: number) => {
    const target_contact =
      all_contacts.find((contact) => contact.id === contact_id) || null;
    if (target_contact) {
      phonebook_service
        .delete(target_contact.id)
        .catch((err) => console.log(err));
      set_all_contacts(
        all_contacts.filter((contact) => contact.id !== target_contact.id)
      );
    }
  };

  type TEvent = React.ChangeEvent<HTMLInputElement>;

  const input_change_name = (e: TEvent) => {
    set_new_name(e.target.value);
  };

  const input_change_phone_number = (e: TEvent) => {
    set_new_phone_number(e.target.value);
  };

  const input_change_search = (e: TEvent) => {
    set_search_query(e.target.value);
  };

  return (
    <>
      <h2>Phonebook</h2>
      Search:
      <input value={search_query} onChange={input_change_search} />
      <form onSubmit={add_contact}>
        Name:
        <input value={new_name} onChange={input_change_name} />
        <br />
        Number:
        <input value={new_phone_number} onChange={input_change_phone_number} />
        <br />
        <button type="submit">Add New Contact</button>
      </form>
      <ul>
        <DisplaySearch
          search_query={search_query}
          all_contacts={all_contacts}
          remove_contact={remove_contact}
        />
      </ul>
    </>
  );
};

// TODO:
// window.confirm when deleting or updating a contact
// update their old number if their name already exists
