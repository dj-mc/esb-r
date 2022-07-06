import React from 'react';

export const Notification = (props: { message: string }) => {
  if (props.message === null) {
    return null;
  }
  return <div className="notification">{props.message}</div>;
};
