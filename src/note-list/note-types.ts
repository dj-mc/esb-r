export interface INote {
  id: number;
  content: string;
  date: string;
  important: boolean;
}

export type TNoteList = INote[];
