import React from 'react';
import winner from './util';

interface ISquareProps {
  XO: string;
  clicked: React.MouseEventHandler<HTMLButtonElement>;
}

function Square(props: ISquareProps) {
  return (
    <button className="square" onClick={props.clicked}>
      {props.XO}
    </button>
  );
}

interface IBoardState {
  squares: Array<string>;
  x_plays_this_turn: boolean;
}

class Board extends React.Component<unknown, IBoardState> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      x_plays_this_turn: true
    };
  }

  handle_click(i: number) {
    const squares = this.state.squares.slice();
    if (winner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.x_plays_this_turn ? 'x' : 'o';
    this.setState({
      squares: squares,
      x_plays_this_turn: !this.state.x_plays_this_turn
    });
  }

  render_square(i: number) {
    return (
      <Square XO={this.state.squares[i]} clicked={() => this.handle_click(i)} />
    );
  }

  render() {
    let status: string;
    const W$ = winner(this.state.squares);

    if (W$) {
      status = `Winner: ${W$}`;
    } else {
      status = `Next player: ${this.state.x_plays_this_turn ? 'x' : 'o'}`;
    }
    return (
      <div>
        <div className="status">{status}</div>
        <br />
        <div className="board-row">
          {this.render_square(0)}
          {this.render_square(1)}
          {this.render_square(2)}
        </div>
        <div className="board-row">
          {this.render_square(3)}
          {this.render_square(4)}
          {this.render_square(5)}
        </div>
        <div className="board-row">
          {this.render_square(6)}
          {this.render_square(7)}
          {this.render_square(8)}
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
