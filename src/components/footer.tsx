import React from 'react';

const Footer = (props: { message: string }) => {
  return (
    <>
      <footer>{props.message}</footer>
    </>
  );
};

export { Footer };
