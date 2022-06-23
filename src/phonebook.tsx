import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface IContact {
  name: string;
  phone_number: string;
  id: number;
}

type TContactList = IContact[];

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
            <tr key={contact.id}>
              <td>{contact.name}</td>
              <td>{contact.phone_number}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

const DisplaySearch = (props: {
  search: string;
  all_contacts: TContactList;
}) => {
  const searched_contacts: TContactList = [];
  props.all_contacts.map((each: IContact) => {
    const found = each.name.toLowerCase().includes(props.search.toLowerCase());
    if (found) {
      searched_contacts.push(each);
    }
  });
  return <MakeContactLi contacts={searched_contacts} />;
};

export const Phonebook = () => {
  const init_contacts: TContactList = [];
  const [all_contacts, set_all_contacts] = useState(init_contacts);
  const [new_name, set_new_name] = useState('');
  const [new_phone_number, set_new_phone_number] = useState('');
  const [search_query, set_search_query] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/phonebook').then((response) => {
      set_all_contacts(response.data);
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
      const contact_obj: IContact = {
        name: new_name,
        phone_number: new_phone_number,
        id: all_contacts.length + 1
      };

      set_all_contacts(all_contacts.concat(contact_obj));
      set_new_name('');
      set_new_phone_number('');
    } else {
      alert(`${new_name} already exists.`);
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
        <DisplaySearch search={search_query} all_contacts={all_contacts} />
      </ul>
    </>
  );
};
