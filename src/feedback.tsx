import React, { useState } from 'react';
import { ButtonOnClick } from './button-on-click';

export const Feedback = () => {
  const [feeling, set_feeling] = useState({
    good: 0,
    neutral: 0,
    bad: 0
  });

  const set_feeling_factory = (felt: string) => () => {
    const new_state = { ...feeling };
    new_state[felt] += 1;
    return set_feeling(new_state);
  };

  return (
    <>
      Good: {feeling.good}, Neutral: {feeling.neutral}, Bad: {feeling.bad}
      <ButtonOnClick fn={set_feeling_factory('good')} text="Good" />
      <ButtonOnClick fn={set_feeling_factory('neutral')} text="Neutral" />
      <ButtonOnClick fn={set_feeling_factory('bad')} text="Bad" />
    </>
  );
};
