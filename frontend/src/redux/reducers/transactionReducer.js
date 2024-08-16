// src/redux/reducers.js

import {
    FETCH_TRANSACTIONS_REQUEST,
    FETCH_TRANSACTIONS_SUCCESS,
    FETCH_TRANSACTIONS_FAILURE,
    FETCH_TRANSACTION_TYPES_REQUEST,
    FETCH_TRANSACTION_TYPES_SUCCESS,
    FETCH_TRANSACTION_TYPES_FAILURE,
    FETCH_SINGLE_TRANSACTION_REQUEST,
    FETCH_SINGLE_TRANSACTION_SUCCESS,
    FETCH_SINGLE_TRANSACTION_FAILURE,
    POST_TRANSACTION_REQUEST,
    POST_TRANSACTION_SUCCESS,
    POST_TRANSACTION_FAILURE
  } from '../types/transactionTypes';
  
  const initialState = {
    transactions: [],
    transactionTypes: [],
    singleTransaction: null,
    loading: false,
    error: null
  };
  
  const transactionReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_TRANSACTIONS_REQUEST:
        return { ...state, loading: true };
      case FETCH_TRANSACTIONS_SUCCESS:
        return { ...state, loading: false, transactions: action.payload };
      case FETCH_TRANSACTIONS_FAILURE:
        return { ...state, loading: false, error: action.payload };
      
      case FETCH_TRANSACTION_TYPES_REQUEST:
        return { ...state, loading: true };
      case FETCH_TRANSACTION_TYPES_SUCCESS:
        return { ...state, loading: false, transactionTypes: action.payload };
      case FETCH_TRANSACTION_TYPES_FAILURE:
        return { ...state, loading: false, error: action.payload };
      
      case FETCH_SINGLE_TRANSACTION_REQUEST:
        return { ...state, loading: true };
      case FETCH_SINGLE_TRANSACTION_SUCCESS:
        return { ...state, loading: false, singleTransaction: action.payload };
      case FETCH_SINGLE_TRANSACTION_FAILURE:
        return { ...state, loading: false, error: action.payload };
      
      case POST_TRANSACTION_REQUEST:
        return { ...state, loading: true };
      case POST_TRANSACTION_SUCCESS:
        return { ...state, loading: false, transactions: [...state.transactions, action.payload] };
      case POST_TRANSACTION_FAILURE:
        return { ...state, loading: false, error: action.payload };
      
      default:
        return state;
    }
  };
  
  export default transactionReducer;
  