import React from 'react';

interface SquareProps {
  XO: string;
  onClick: () => void;
}

class Square extends React.Component<SquareProps> {
  render() {
    return (
      <button
        className="square"
        onClick={() => {
          this.props.onClick();
        }}
      >
        {this.props.XO}
      </button>
    );
  }
}

interface BoardState {
  squares: Array<string>;
}

class Board extends React.Component<unknown, BoardState> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      squares: Array(9).fill(null)
    };
  }

  handleClick(i: number) {
    const squares = this.state.squares.slice();
    squares[i] = 'X';
    this.setState({ squares: squares });
  }

  renderSquare(i: number) {
    return (
      <Square XO={this.state.squares[i]} onClick={() => this.handleClick(i)} />
    );
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <br />
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

export default class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{}</div>
          <ol>{}</ol>
        </div>
      </div>
    );
  }
}
