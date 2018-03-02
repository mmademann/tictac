import helpers from '../tools/helpers'
// import { Map } from 'immutable'

export default (state = {}, action) => {
  switch (action.type) {
    case 'SELECT_SQUARE':
       	const history = state.history.slice(0, state.stepNumber + 1);
    	const currentHistory = history[history.length - 1];
    	const currentSquares = currentHistory.squares.slice();
    	const gameOver = currentHistory.state === 'game-over';
    	const sameBoxSelected = (currentSquares[action.index]) ? true : false;

    	const newStepNumber = (!gameOver && !sameBoxSelected)
    		? history.length
    		: state.stepNumber;

    	const xIsNext = (!gameOver && !sameBoxSelected)
    		? !state.xIsNext
    		: state.xIsNext;

    	const newHistory = history.concat([{
    		state: currentHistory.state,
    		winner: currentHistory.winner,
    		squares: currentSquares
    	}]);

    	if (!gameOver && !sameBoxSelected) {
    		currentSquares[action.index] = state.xIsNext ? 'X' : 'O';
    	}

    	const winner = helpers.calculateWinner(currentSquares);

    	if (winner) {
    		newHistory[newStepNumber].state = 'game-over';
    		newHistory[newStepNumber].winner = winner;
    	}

		const newBoardState = {
			history: newHistory,
			stepNumber: newStepNumber,
			xIsNext: xIsNext,
			winner: winner,
			fromHistory: false
		}
    	return newBoardState;

    case 'SELECT_HISTORY':
    	const newHistoryState = Object.assign({}, state, {
    		stepNumber: action.move,
    		xIsNext: (action.move % 2) === 0,
    		fromHistory: true
    	});
		return newHistoryState;

    default:
      	return {
  			history: [{
  				state: 'active',
  				winner: null,
  		  		squares: Array(9).fill(null)
  			}],
  			stepNumber: 0,
  			xIsNext: true,
  			winner: false,
  			willHaveWinner: false,
  			gameOver: false,
  			fromHistory: false
      	}
  	}
}
