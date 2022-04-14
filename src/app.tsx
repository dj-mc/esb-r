import React from 'react';
import ReactDOM from 'react-dom';
import Server from 'react-dom/server';
import Game from './tic-tac-toe';
import LikeButton from './like-button';

const Greet = () => {
  return (
    <div>
      <h1>esb + react</h1>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias ipsum
        dignissimos ipsa. Rerum debitis quidem veniam natus, perspiciatis
        soluta, ex molestias, commodi dolorem placeat tenetur. Distinctio
        excepturi necessitatibus iusto facilis?
      </p>
    </div>
  );
};

console.log(Server.renderToString(<Greet />));

ReactDOM.render(<Game />, document.getElementById('game_container'));

ReactDOM.render(
  <LikeButton />,
  document.querySelector('#like_button_container')
);
