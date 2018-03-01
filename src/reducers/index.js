import helpers from '../tools/helpers'

export default (state = {}, action) => {
  switch (action.type) {
    case 'SELECT_SQUARE':
    	const history = state.history.slice(0, state.stepNumber + 1);
    	const current = history[history.length - 1];
    	const squares = current.squares.slice();
    	const hasWinner = (helpers.calculateWinner(squares) || squares[action.index])
    	squares[action.index] = state.xIsNext ? 'X' : 'O';
    	const squareState = {
    		history: history.concat([{
    			squares: squares,
    		}]),
    		stepNumber: history.length,
    		xIsNext: !state.xIsNext,
    		winner: hasWinner,
    		fromHistory: false
    	}

    	return squareState;

    case 'SELECT_HISTORY':
    	const historyState = Object.assign({}, state, {
    		stepNumber: action.move,
    		xIsNext: (action.move % 2) === 0,
    		fromHistory: true
    	});

		return historyState;

    default:
      	return {
  			history: [{
  		  		squares: Array(9).fill(null)
  			}],
  			stepNumber: 0,
  			xIsNext: true,
  			winner: false,
  			fromHistory: false
      	}
  	}
}
