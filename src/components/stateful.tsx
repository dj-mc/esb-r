import React, { useState } from 'react';

const History = (props: { click_history: Array<string> }) => {
  if (props.click_history.length === 0) {
    return <>No history</>;
  }
  return <>History: {props.click_history.join(' ')}</>;
};

const StatefulComponent = () => {
  const [left_clicks, set_left_sum] = useState(0);
  const [right_clicks, set_right_sum] = useState(0);
  const [click_history, set_click_history] = useState<Array<string>>([]);

  const handle_left_click = () => {
    set_click_history(click_history.concat('L'));
    set_left_sum(left_clicks + 1);
  };

  const handle_right_click = () => {
    set_click_history(click_history.concat('R'));
    set_right_sum(right_clicks + 1);
  };

  return (
    <>
      {left_clicks}
      <button onClick={handle_left_click}>left</button>
      <button onClick={handle_right_click}>right</button>
      {right_clicks}
      <History click_history={click_history} />
    </>
  );
};

export { StatefulComponent };
