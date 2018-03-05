import React from 'react'
import Board from './Board'

class Game extends React.Component {

    render() {
        let status;
        const { value, onSelectSquare, onSelectHistory } = this.props;
        const stepNumber = value.stepNumber;
        const currentHistory = value.history;
        const currentBoard = currentHistory[stepNumber];
        const historyListItems = currentHistory.map((board, move) => {
            const desc = move ? 'Go to move #' + move : 'Go to the start';
            if (board.state !== 'game-over'){
                return (
                    <li key={move}>
                        <button onClick={(i) => onSelectHistory(move)}>{desc}</button>
                    </li>
                );
            }
            else { return (''); }
        });

        if (currentBoard.state === 'game-over') {
            status = 'Winner: ' + currentBoard.winner;
        }
        else {
            status = 'Next player: ' + (value.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={currentBoard.squares}
                        onClick={onSelectSquare}
                    />
                </div>
                <div className="game-info">
                    <div className="status">{status}</div>
                    <ol>{historyListItems}</ol>
                </div>
            </div>
        );
    }
}

export default Game
