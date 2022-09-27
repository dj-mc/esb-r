import React from 'react';

export const ButtonOnClick = (props: {
  fn: React.ButtonHTMLAttributes<HTMLButtonElement>['onClick'];
  text: string;
}) => {
  return (
    <>
      <button onClick={props.fn}>{props.text}</button>
    </>
  );
};
