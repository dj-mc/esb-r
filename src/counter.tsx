import React, { useState } from 'react';

interface ICounterProps {
  n: number;
}

export const Counter: React.FC<ICounterProps> = (props) => {
  let { n } = props;
  function click_handler(value: number) {
    n = value !== 0 ? n + value : 0;
    const counter_display = document.getElementById('counter-display');
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

export const StatefulCounter = () => {
  const [n, set_n] = useState(0);
  const decrement_n = () => set_n(n - 1);
  const reset_n = () => set_n(0);
  const increment_n = () => set_n(n + 1);
  return (
    <>
      <DisplayCounter n={n} />
      <button onClick={decrement_n}>-1</button>
      <button onClick={reset_n}>0</button>
      <button onClick={increment_n}>+1</button>
    </>
  );
};
