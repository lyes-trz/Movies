import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

// reducers
import base from './reducer'

const reducers = {
    base,
    routing: routerReducer,
}

const mainReducer = combineReducers(reducers)

export default mainReducer
