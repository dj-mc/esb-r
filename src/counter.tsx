import React from 'react';

interface ICounterProps {
  n: number;
}

export const Counter: React.FC<ICounterProps> = (props) => {
  let { n } = props;
  function click_handler(value: number) {
    n += value;
    console.log(value, n);
    const counter_display = document.getElementById('counter-display');
    counter_display.innerText = n.toString();
  }
  return (
    <div>
      <p id="counter-display">{n}</p>
      <button onClick={() => click_handler(1)}>+1</button>
      <button onClick={() => click_handler(-1)}>-1</button>
    </div>
  );
};
