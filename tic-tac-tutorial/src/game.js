import React from 'react';
import Board from './board';

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            xIsNext: true,
            steps: 0
        };
    }

    handleClick(i) {
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        // early return if game is won or if square is taken
        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
              squares: squares,
            }]),
            xIsNext: !this.state.xIsNext,
            step: this.state.steps + 1
          });
    }

    jumpTo(i) {
        if (i === this.state.history.length - 1) {
            return;
        }
        const history = this.state.history.slice(0, (this.state.history.length - i - 1) * -1);
        const step = i;
        const xIsNext = i % 2 === 0;
        this.setState({
            history: history,
            step: step,
            xIsNext: xIsNext
        });
    }

    render() {
        const history = this.state.history;
        const current = history[history.length - 1];
        const winner = calculateWinner(current.squares);

        // set game message 
        let status = winner === null ? 
            'Next player: ' + (this.state.xIsNext ? 'X' : 'O') :
            'The winner is: ' + winner;
        if(checkComplete(current.squares) && winner == null) {
            status = 'Tie game... Try again!';
        }

        const moves = history.map((step, move) => {
            const desc = move ? 
                'Go to move #' + move :
                'Go to start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        return (
        <div className="game">
            <div className="game-board">
            <Board 
                squares={current.squares}
                onClick = {(i) => this.handleClick(i)}
            />
            </div>
            <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
            </div>
        </div>
        );
    }
}

function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
}

function checkComplete(squares) {
    for (let i = 0; i < squares.length; i++) {
        if (squares[i] === null) {
            return false;
        }
    }
    return true;
}