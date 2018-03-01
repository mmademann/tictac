import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import Game from './components/Game'
import reducer from './reducers'
import './index.css';

const store = createStore(reducer)

const render = () => ReactDOM.render(
    <Provider store={store}>
        <Game
            value={store.getState()}
            onSelectSquare={(i) => store.dispatch({ type: 'SELECT_SQUARE', index: i })}
            onSelectHistory={(move) => store.dispatch({ type: 'SELECT_HISTORY', move: move})}
        />
    </Provider>,
    document.getElementById('root')
)

render()
store.subscribe(render)
