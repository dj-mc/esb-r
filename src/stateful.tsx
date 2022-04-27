import { useState } from 'react';

const StatefulComponent = () => {
  const [clicks, set_clicks] = useState({
    left: 0,
    right: 0
  });

  const handle_left_click = () =>
    set_clicks({ ...clicks, left: clicks.left + 1 });

  const handle_right_click = () =>
    set_clicks({ ...clicks, right: clicks.right + 1 });

  return (
    <>
      {clicks.left}
      <button onClick={handle_left_click}>left</button>
      <button onClick={handle_right_click}>right</button>
      {clicks.right}
    </>
  );
};
