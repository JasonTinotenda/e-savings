// src/redux/actions.js

import axios from 'axios';
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

// Define the API base URL
const API_URL = 'http://localhost:8000/api';

// Fetch all transactions
export const fetchTransactions = () => async dispatch => {
  dispatch({ type: FETCH_TRANSACTIONS_REQUEST });
  try {
    const response = await axios.get(`${API_URL}/transactions/`);
    dispatch({ type: FETCH_TRANSACTIONS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_TRANSACTIONS_FAILURE, payload: error.message });
  }
};

// Fetch all transaction types
export const fetchTransactionTypes = () => async dispatch => {
  dispatch({ type: FETCH_TRANSACTION_TYPES_REQUEST });
  try {
    const response = await axios.get(`${API_URL}/transaction-types/`);
    dispatch({ type: FETCH_TRANSACTION_TYPES_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_TRANSACTION_TYPES_FAILURE, payload: error.message });
  }
};

// Fetch a single transaction
export const fetchSingleTransaction = id => async dispatch => {
  dispatch({ type: FETCH_SINGLE_TRANSACTION_REQUEST });
  try {
    const response = await axios.get(`${API_URL}/transactions/${id}/`);
    dispatch({ type: FETCH_SINGLE_TRANSACTION_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_SINGLE_TRANSACTION_FAILURE, payload: error.message });
  }
};

// Post a new transaction
export const postTransaction = data => async dispatch => {
  dispatch({ type: POST_TRANSACTION_REQUEST });
  try {
    const response = await axios.post(`${API_URL}/transactions/`, data, {
      headers: { 'Content-Type': 'application/json' }
    });
    dispatch({ type: POST_TRANSACTION_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: POST_TRANSACTION_FAILURE, payload: error.message });
  }
};
