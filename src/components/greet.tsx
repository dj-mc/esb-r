import React from 'react';
import * as ReactDOMServer from 'react-dom/server';

const greet_options = {
  name: 'dj-mc',
  status: 'Programming',
  age: 99
};

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

console.log(ReactDOMServer.renderToString(<Greet {...greet_options} />));
