import React, { useEffect, useState } from 'react';
import { IContact, TContactList } from './phonebook-types';
import { phonebook_service } from './phonebook-api';
import { Notification } from '../components/notification';

const DisplaySearch = (props: {
  search_query: string;
  all_contacts: TContactList;
  remove_contact: CallableFunction;
}) => {
  const searched_contacts: TContactList = [];
  props.all_contacts.map((contact: IContact) => {
    const found_name = contact.name
      ? contact.name.toLowerCase().includes(props.search_query.toLowerCase())
      : null;
    const found_number = contact.phone_number
      ? contact.phone_number.includes(props.search_query)
      : null;
    if (found_name || found_number) {
      searched_contacts.push(contact);
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
                <button
                  onClick={() => {
                    props.remove_contact(contact.id);
                  }}
                >
                  Delete Contact
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

const Phonebook = () => {
  const init_contacts: TContactList = [];
  const [all_contacts, set_all_contacts] = useState(init_contacts);
  const [new_name, set_new_name] = useState('');
  const [new_phone_number, set_new_phone_number] = useState('');
  const [search_query, set_search_query] = useState('');
  const [notification, set_notification] = useState('');

  useEffect(() => {
    phonebook_service.getAll().then((init_phonebook) => {
      set_all_contacts(init_phonebook);
    });
  }, []);

  const add_contact = (e: React.FormEvent) => {
    e.preventDefault();

    let found_duplicate = false;
    all_contacts.map((each) => {
      if (each.phone_number === new_phone_number) {
        found_duplicate = true;
      }
    });

    if (!found_duplicate) {
      const new_contact: IContact = {
        name: new_name,
        phone_number: new_phone_number,
        id: all_contacts.length + 1
      };

      phonebook_service
        .create(new_contact)
        .then((newly_created_contact) => {
          set_notification(`Added ${new_contact.name}`);
          set_all_contacts(all_contacts.concat(newly_created_contact));
          set_new_name('');
          set_new_phone_number('');
        })
        .catch((error) => {
          console.error(error.response.data.error);

          set_notification(error.response.data.error);
        });
    } else {
      const duplicate_contact = all_contacts.find(
        (contact) => contact.phone_number === new_phone_number
      );
      if (duplicate_contact) {
        set_notification(`${new_phone_number} already exists.`);
        if (
          window.confirm(`
        Update "${duplicate_contact?.name}" to ${new_name}?
        `)
        ) {
          const new_contact = { ...duplicate_contact, name: new_name };
          phonebook_service
            .update(duplicate_contact.id, new_contact)
            .then((updated_contact) => {
              set_all_contacts(
                all_contacts.map((contact) =>
                  contact.id === duplicate_contact.id
                    ? updated_contact
                    : contact
                )
              );
            });
        }
      }
    }
  };

  const remove_contact = (contact_id: number) => {
    const target_contact =
      all_contacts.find((contact) => contact.id === contact_id) || null;

    if (target_contact) {
      if (
        window.confirm(
          `Are you sure you want to delete ${
            target_contact.name
              ? target_contact.name
              : target_contact.phone_number
          }?`
        )
      ) {
        phonebook_service
          .delete(target_contact.id)
          .catch((error) => console.error(error));
        set_all_contacts(
          all_contacts.filter((contact) => contact.id !== target_contact.id)
        );
        set_notification(`Removed ${target_contact.name}`);
      }
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
      <Notification message={notification} />
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
// Duplicate names should be OK.
// If a duplicate number is found ask the user to confirm
// updating the associated name.

export { Phonebook };
