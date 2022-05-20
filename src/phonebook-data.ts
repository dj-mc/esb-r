export interface IContact {
  name: string;
}

export type TContactList = IContact[];

export const phonebook_data: TContactList = [
  { name: 'Dan' },
  { name: 'Zak' },
  { name: 'Rob' }
];
