import {createStore, combineReducers, applyMiddleware} from 'redux';
import userReducer from './useReducer';

const rootReducer = combineReducers({
    user: userReducer,
});

const store = createStore(rootReducer , applyMiddleware());
export default store;