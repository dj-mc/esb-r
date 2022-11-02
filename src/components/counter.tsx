import React, { useState } from 'react';

interface ICounterProps {
  n: number;
}

const Counter = (props: ICounterProps) => {
  let { n } = props;
  function click_handler(value: number) {
    n = value !== 0 ? n + value : 0;
    const counter_display = document.getElementById(
      'counter-display'
    ) as HTMLElement;
    counter_display.innerText = n.toString();
  }
  return (
    <>
      <p id="counter-display">{n}</p>
      <button onClick={() => click_handler(-1)}>-1</button>
      <button onClick={() => click_handler(0)}>0</button>
      <button onClick={() => click_handler(1)}>+1</button>
    </>
  );
};

const DisplayCounter = (props: { n: number }) => {
  return <>{props.n}</>;
};

const StatefulCounter = () => {
  const [n, set_n] = useState(0);
  const set_n_factory = (n: number) => () => set_n(n);
  return (
    <>
      <DisplayCounter n={n} />
      <button onClick={set_n_factory(n - 1)}>-1</button>
      <button onClick={set_n_factory(0)}>0</button>
      <button onClick={set_n_factory(n + 1)}>+1</button>
    </>
  );
};

export { Counter, StatefulCounter };
