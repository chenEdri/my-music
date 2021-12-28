
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { songReducer } from './reducer/song.reducer';
import {playlistReducer} from './reducer/playlist.reducer';
import{historyReducer} from './reducer/history.reducer'


const rootReducer = combineReducers({
    songReducer,
    playlistReducer,
    historyReducer
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))