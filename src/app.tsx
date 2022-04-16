import React from 'react';
import ReactDOM from 'react-dom';
import Server from 'react-dom/server';
import Game from './tic-tac-toe';
import LikeButton from './like-button';

const Greet = (props: { name: string; status: string }) => {
  return (
    <div>
      <h1>esb + react</h1>
      <p>
        Hello, {props.name}.
        <br />
        The time is {Date.now()}.
        <br />
        Your status is: {props.status}.
      </p>
    </div>
  );
};

const greet_options = {
  name: 'dj-mc',
  status: 'Programming'
};

const MyFooter = () => {
  return (
    <>
      <footer>Thanks for being apart of the world wide web!</footer>
    </>
  );
};

const App = () => {
  return (
    <>
      <Greet {...greet_options} />
      <h1>Main content</h1>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias ipsum
        dignissimos ipsa. Rerum debitis quidem veniam natus, perspiciatis
        soluta, ex molestias, commodi dolorem placeat tenetur. Distinctio
        excepturi necessitatibus iusto facilis?
      </p>
      <Game />
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center'
        }}
      >
        <LikeButton />
        <MyFooter />
      </div>
    </>
  );
};

console.log(Server.renderToString(<Greet {...greet_options} />));

ReactDOM.render(<App />, document.getElementById('root'));
