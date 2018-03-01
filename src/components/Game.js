import React from 'react'
import helpers from '../tools/helpers'
import Board from './Board'

class Game extends React.Component {

    render() {
        const { value, onSelectSquare, onSelectHistory } = this.props;
        const history = value.history;
        const current = history[value.stepNumber];
        const winner = helpers.calculateWinner(current.squares);
        const moves = history.map((step, move) => {
            const desc = move ? 'Go to move #' + move : 'Go to the start';
            return (
                <li key={move}>
                    <button onClick={(i) => onSelectHistory(move)}>{desc}</button>
                </li>
            );
        });

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (value.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={onSelectSquare}
                    />
                </div>
                <div className="game-info">
                    <div className="status">{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

export default Game
