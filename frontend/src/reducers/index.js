import { combineReducers } from 'redux';
import {transactionReducer} from './transactionsReducers';  // Replace with your actual reducer file names
import accountsReducer from './accountsReducer';
import { loanListReducer, loanDetailsReducer, loanCreateUpdateReducer, loanDeleteReducer } from './loansReducer';

// Combine all your reducers into a root reducer
const rootReducer = combineReducers({
  transactions: transactionReducer,
  accounts: accountsReducer,
  loanList: loanListReducer,
  loanDetails: loanDetailsReducer,
  loanCreateUpdate: loanCreateUpdateReducer,
  loanDelete: loanDeleteReducer,
});

export default rootReducer;