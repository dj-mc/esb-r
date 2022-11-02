import React from 'react';

interface IState {
  liked: boolean;
}

class LikeButton extends React.Component<unknown, IState> {
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
      { id: 'like-btn', onClick: () => this.setState({ liked: true }) },
      'Like'
    );
  }
}

export { LikeButton };
