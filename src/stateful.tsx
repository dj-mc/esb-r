import React, { useState } from 'react';
import { ButtonOnClick } from './button-on-click';

const History = (props: { click_history: Array<string> }) => {
  if (props.click_history.length === 0) {
    return <>No history</>;
  }
  return <>History: {props.click_history.join(' ')}</>;
};

export const StatefulComponent = () => {
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
      <ButtonOnClick fn={handle_left_click} text="left" />
      <ButtonOnClick fn={handle_right_click} text="right" />
      {right_clicks}
      <History click_history={click_history} />
    </>
  );
};
