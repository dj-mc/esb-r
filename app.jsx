import * as React from 'react';
import * as Server from 'react-dom/server';

let Greet = () => {
  return (
    <div>
      <h1>esb + react</h1>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias ipsum dignissimos ipsa.
        Rerum debitis quidem veniam natus, perspiciatis soluta, ex molestias, commodi dolorem
        placeat tenetur. Distinctio excepturi necessitatibus iusto facilis?
      </p>
    </div>
  );
};

console.log(Server.renderToString(<Greet />));
