import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { App } from './app';

const refresh = () => {
  ReactDOMClient.createRoot(
    document.getElementById('root') as HTMLElement
  ).render(<App />);
};

refresh();
