import React from 'react';

const Notification = (props: { message: string }) => {
  if (props.message === null) {
    return null;
  }
  return <div className="notification">{props.message}</div>;
};

export { Notification };
