import { createStore, applyMiddleware } from 'redux'; // Add the import statement for createStore and applyMiddleware
import {thunk} from 'redux-thunk'; // Assuming you have installed redux-thunk

import { combineReducers } from 'redux';
import personsReducer from './reducers/accountReducer'; 
import accountReducer from './reducers/accountReducer'; 
import loanReducer from './reducers/loanReducer';
import transactionReducer from './reducers/transactionReducer';

const rootReducer = combineReducers({
    personsReducer,
    accountReducer,
    loanReducer,
    transactionReducer,
    // other reducers
});

const store = createStore(rootReducer, applyMiddleware(thunk)); // Assuming you're using Redux Thunk

export default store;