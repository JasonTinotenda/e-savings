import { combineReducers } from 'redux';
import auth from './auth';
import personReducers from './personReducers';
import accountsReducers from './accountsReducers';
import transactionReducers from './transactionReducers';

export default combineReducers({
    auth,
    person: personReducers,
    account: accountsReducers,
    transaction: transactionReducers
});