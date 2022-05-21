export interface IContact {
  name: string;
  phone_no: string;
}

export type TContactList = IContact[];

export const phonebook_data: TContactList = [
  { name: 'Dan', phone_no: '555-444-1234' },
  { name: 'Zak', phone_no: '666-444-1234' },
  { name: 'Rob', phone_no: '777-444-1234' }
];
