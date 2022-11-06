import React from 'react';
import ReactDOM from 'react-dom/client';
import { NoteList } from './pages/note-list-page';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <NoteList />
  </React.StrictMode>
);
