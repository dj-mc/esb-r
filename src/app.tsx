import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import * as ReactDOMServer from 'react-dom/server';
import Game from './tic-tac-toe';
import LikeButton from './like-button';
import { Counter } from './counter';

const Greet = ({ name, status }: { name: string; status: string }) => {
  return (
    <div>
      <h1>esb + react</h1>
      <p>
        Hello, {name}.
        <br />
        The time is {Date.now()}.
        <br />
        Your status is: {status}.
      </p>
    </div>
  );
};

const greet_options = {
  name: 'dj-mc',
  status: 'Programming'
};

const MyFooter = (props: { message: string }) => {
  return (
    <>
      <footer>{props.message}</footer>
    </>
  );
};

const App = (props: { my_prop: string }) => {
  const { my_prop } = props;
  return (
    <>
      <Greet {...greet_options} />
      <h1>{my_prop}</h1>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias ipsum
        dignissimos ipsa. Rerum debitis quidem veniam natus, perspiciatis
        soluta, ex molestias, commodi dolorem placeat tenetur. Distinctio
        excepturi necessitatibus iusto facilis?
      </p>
      <Game />
      <div id="footer-container">
        <Counter n={32} />
        <LikeButton />
        <MyFooter message="Thanks for being apart of the world wide web!" />
      </div>
    </>
  );
};

const refresh = () => {
  ReactDOMClient.createRoot(document.getElementById('root')).render(
    <App my_prop="foobar" />
  );
};

console.log(ReactDOMServer.renderToString(<Greet {...greet_options} />));

refresh();
