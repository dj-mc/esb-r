import React from 'react';

interface IState {
  liked: boolean;
}

export default class LikeButton extends React.Component<unknown, IState> {
  constructor(props: unknown) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return 'You liked this.';
    }

    return React.createElement(
      'button',
      { onClick: () => this.setState({ liked: true }) },
      'Like'
    );
  }
}
