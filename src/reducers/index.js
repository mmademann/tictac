import helpers from '../tools/helpers'

function defaultState() {
  	return {
  	  	history: [{
  	    	squares: Array(9).fill(null)
  	  	}],
  	  	stepNumber: 0,
  	  	xIsNext: true,
  	  	winner: false
  	}
}

export default (state = defaultState(), action) => {
  switch (action.type) {
    case 'SELECT_SQUARE':
    	const history = state.history.slice(0, state.stepNumber + 1);
    	const current = history[history.length - 1];
    	const squares = current.squares.slice();
    	const hasWinner = (helpers.calculateWinner(squares) || squares[action.index]) ? true : false;
    	squares[action.index] = state.xIsNext ? 'X' : 'O';
    	const newState = {
    		history: history.concat([{
    			squares: squares,
    		}]),
    		stepNumber: history.length,
    		xIsNext: !state.xIsNext,
    		winner: hasWinner
    	}
    	return newState;
    case 'SELECT_HISTORY':
		return {
		  ...state,
		    stepNumber: action.move,
		    xIsNext: (action.move % 2) === 0
		}
    default:
      	return state
  }
}
