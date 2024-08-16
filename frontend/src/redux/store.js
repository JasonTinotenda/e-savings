import { configureStore } from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk'; 
import loanReducer from './loanSlice';
import transactionReducer from './transactionlice';
import accountReducer from './accountSlice';
import personReducer from './personSlice';

const rootReducer = {
    persons: personReducer,
    account: accountReducer,
    loan: loanReducer,
    transaction: transactionReducer,
    // other reducers
};

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
