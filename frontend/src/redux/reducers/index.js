import { combineReducers } from 'redux';
import transactionReducer from './transactionReducers';  // Replace with your actual reducer file names
import accountsReducer from './accountReducer';
import loanReducer from './loanReducer';

// Combine all your reducers into a root reducer
const rootReducer = combineReducers({
  transactions: transactionReducer,
  accounts: accountsReducer,
  loans: loanReducer,
});

export default rootReducer;