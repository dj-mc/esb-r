import React, { useState } from 'react';
import { ButtonOnClick } from './button-on-click';

interface ICounterProps {
  n: number;
}

export const Counter: React.FC<ICounterProps> = (props) => {
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

export const StatefulCounter = () => {
  const [n, set_n] = useState(0);
  const set_n_factory = (n: number) => () => set_n(n);
  return (
    <>
      <DisplayCounter n={n} />
      <ButtonOnClick fn={set_n_factory(n - 1)} text={'-1'} />
      <ButtonOnClick fn={set_n_factory(0)} text={'0'} />
      <ButtonOnClick fn={set_n_factory(n + 1)} text={'+1'} />
    </>
  );
};
