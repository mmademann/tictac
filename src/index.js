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
            onSelectSquare={(i) => store.dispatch({
                index: i,
                type: 'SELECT_SQUARE'
            })}
            onSelectHistory={(move) => store.dispatch({
                move: move,
                type: 'SELECT_HISTORY'
            })}
        />
    </Provider>,
    document.getElementById('root')
)

render()
store.subscribe(render)
