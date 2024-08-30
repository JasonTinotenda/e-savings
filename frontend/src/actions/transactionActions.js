import axios from 'axios';
import {
    TRANSACTION_LOADED_SUCCESS,
    TRANSACTION_LOADED_FAIL,
    TRANSACTION_CREATE_SUCCESS,
    TRANSACTION_CREATE_FAIL,
    TRANSACTION_UPDATE_SUCCESS,
    TRANSACTION_UPDATE_FAIL,
    TRANSACTION_DELETE_SUCCESS,
    TRANSACTION_DELETE_FAIL
} from './types';

// Load all transactions
export const loadTransactions = () => async dispatch => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/transactions/`);
        dispatch({
            type: TRANSACTION_LOADED_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: TRANSACTION_LOADED_FAIL,
            payload: err.response.data // Include error details
        });
    }
};

// Create a transaction
export const createTransaction = (transactionData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/transactions/`, transactionData, config);
        dispatch({
            type: TRANSACTION_CREATE_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: TRANSACTION_CREATE_FAIL,
            payload: err.response.data // Include error details
        });
    }
};

// Update a transaction
export const updateTransaction = (id, transactionData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.put(`${process.env.REACT_APP_API_URL}/api/transactions/${id}/`, transactionData, config);
        dispatch({
            type: TRANSACTION_UPDATE_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: TRANSACTION_UPDATE_FAIL,
            payload: err.response.data // Include error details
        });
    }
};

// Delete a transaction
export const deleteTransaction = (id) => async dispatch => {
    try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/transactions/${id}/`);
        dispatch({
            type: TRANSACTION_DELETE_SUCCESS,
            payload: id
        });
    } catch (err) {
        dispatch({
            type: TRANSACTION_DELETE_FAIL,
            payload: err.response.data // Include error details
        });
    }
};
