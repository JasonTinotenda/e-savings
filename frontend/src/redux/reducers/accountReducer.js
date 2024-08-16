// src/redux/reducers.js

import { combineReducers } from 'redux';
import { PERSON_ACTIONS } from '../types/accountTypes';
import { ACCOUNT_ACTIONS } from '../types/accountTypes';

// Initial state for persons
const initialPersonState = {
  persons: [],
  person: null,
  loading: false,
  error: null,
};

// Person Reducer
const personReducer = (state = initialPersonState, action) => {
  switch (action.type) {
    case PERSON_ACTIONS.FETCH_PERSONS_REQUEST:
    case PERSON_ACTIONS.FETCH_PERSON_REQUEST:
    case PERSON_ACTIONS.CREATE_PERSON_REQUEST:
    case PERSON_ACTIONS.UPDATE_PERSON_REQUEST:
    case PERSON_ACTIONS.DELETE_PERSON_REQUEST:
      return { ...state, loading: true };
    case PERSON_ACTIONS.FETCH_PERSONS_SUCCESS:
      return { ...state, persons: action.payload, loading: false };
    case PERSON_ACTIONS.FETCH_PERSON_SUCCESS:
      return { ...state, person: action.payload, loading: false };
    case PERSON_ACTIONS.CREATE_PERSON_SUCCESS:
      return { ...state, persons: [...state.persons, action.payload], loading: false };
    case PERSON_ACTIONS.UPDATE_PERSON_SUCCESS:
      return { 
        ...state, 
        persons: state.persons.map(person => person.id === action.payload.id ? action.payload : person),
        loading: false 
      };
    case PERSON_ACTIONS.DELETE_PERSON_SUCCESS:
      return { 
        ...state, 
        persons: state.persons.filter(person => person.id !== action.payload), 
        loading: false 
      };
    case PERSON_ACTIONS.FETCH_PERSONS_FAILURE:
    case PERSON_ACTIONS.FETCH_PERSON_FAILURE:
    case PERSON_ACTIONS.CREATE_PERSON_FAILURE:
    case PERSON_ACTIONS.UPDATE_PERSON_FAILURE:
    case PERSON_ACTIONS.DELETE_PERSON_FAILURE:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

// Initial state for accounts
const initialAccountState = {
  accounts: [],
  account: null,
  loading: false,
  error: null,
};

// Account Reducer
const accountReducer = (state = initialAccountState, action) => {
  switch (action.type) {
    case ACCOUNT_ACTIONS.FETCH_ACCOUNTS_REQUEST:
    case ACCOUNT_ACTIONS.FETCH_ACCOUNT_REQUEST:
    case ACCOUNT_ACTIONS.CREATE_ACCOUNT_REQUEST:
    case ACCOUNT_ACTIONS.UPDATE_ACCOUNT_REQUEST:
    case ACCOUNT_ACTIONS.DELETE_ACCOUNT_REQUEST:
      return { ...state, loading: true };
    case ACCOUNT_ACTIONS.FETCH_ACCOUNTS_SUCCESS:
      return { ...state, accounts: action.payload, loading: false };
    case ACCOUNT_ACTIONS.FETCH_ACCOUNT_SUCCESS:
      return { ...state, account: action.payload, loading: false };
    case ACCOUNT_ACTIONS.CREATE_ACCOUNT_SUCCESS:
      return { ...state, accounts: [...state.accounts, action.payload], loading: false };
    case ACCOUNT_ACTIONS.UPDATE_ACCOUNT_SUCCESS:
      return { 
        ...state, 
        accounts: state.accounts.map(account => account.id === action.payload.id ? action.payload : account),
        loading: false 
      };
    case ACCOUNT_ACTIONS.DELETE_ACCOUNT_SUCCESS:
      return { 
        ...state, 
        accounts: state.accounts.filter(account => account.id !== action.payload), 
        loading: false 
      };
    case ACCOUNT_ACTIONS.FETCH_ACCOUNTS_FAILURE:
    case ACCOUNT_ACTIONS.FETCH_ACCOUNT_FAILURE:
    case ACCOUNT_ACTIONS.CREATE_ACCOUNT_FAILURE:
    case ACCOUNT_ACTIONS.UPDATE_ACCOUNT_FAILURE:
    case ACCOUNT_ACTIONS.DELETE_ACCOUNT_FAILURE:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  person: personReducer,
  account: accountReducer
});

export default rootReducer;
