import axios from 'axios';

import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import * as ReactDOMServer from 'react-dom/server';

import Game from './tic-tac-toe';
import LikeButton from './like-button';
import { Counter, StatefulCounter } from './counter';
import { StatefulComponent } from './stateful';
import { Feedback } from './feedback';
import { Anecdotes } from './anecdotes';
import { Notes } from './notes';
import { course_data } from './course-data';
import { Courses } from './course';
import { Phonebook } from './phonebook';
import { Countries } from './countries';

const promise_for_notes = axios.get('http://localhost:3001/notes');

promise_for_notes.then((response) => {
  console.log(response);
});

const Greet = ({
  name,
  status,
  age
}: {
  name: string;
  status: string;
  age: number;
}) => {
  const year_born = () => {
    const year_now = new Date().getFullYear();
    return year_now - age;
  };
  return (
    <>
      <h1>esb + react</h1>
      <p>
        Hello, {name}.
        <br />
        The time is {Date.now()}.
        <br />
        You&apos;ve been alive since {year_born()}!
        <br />
        Your status is: {status}.
      </p>
    </>
  );
};

const MyFooter = (props: { message: string }) => {
  return (
    <>
      <footer>{props.message}</footer>
    </>
  );
};

const greet_options = {
  name: 'dj-mc',
  status: 'Programming',
  age: 99
};

const App = (props: { title: string; init_count: number }) => {
  const { title, init_count } = props;
  return (
    <>
      <Greet {...greet_options} />
      <h2>{title}</h2>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias ipsum
        dignissimos ipsa. Rerum debitis quidem veniam natus, perspiciatis
        soluta, ex molestias, commodi dolorem placeat tenetur. Distinctio
        excepturi necessitatibus iusto facilis?
      </p>
      <Anecdotes />
      <br />
      <StatefulComponent />
      <br />
      <Feedback />
      <br />
      <Game />
      <Notes />
      <Courses courses={course_data} />
      <div id="footer-container">
        <LikeButton />
        <div
          style={{
            fontSize: '18px' // Inline style
          }}
        >
          <MyFooter message="Thanks for being apart of the world wide web!" />
        </div>
        <Counter n={init_count} />
        <StatefulCounter />
      </div>
      <Phonebook />
      <br />
      <Countries />
    </>
  );
};

const refresh = () => {
  ReactDOMClient.createRoot(
    document.getElementById('root') as HTMLElement
  ).render(<App title="App Title" init_count={0} />);
};

console.log(ReactDOMServer.renderToString(<Greet {...greet_options} />));

refresh();
