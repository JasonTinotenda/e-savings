import { combineReducers } from 'redux';
import auth from './auth';
import accountsReducer from './accountsReducers';

export default combineReducers({
    auth,
    accountsReducer
});