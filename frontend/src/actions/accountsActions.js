import axios from 'axios';
import {
    ACCOUNT_LOADED_SUCCESS,
    ACCOUNT_LOADED_FAIL,
    ACCOUNT_CREATE_SUCCESS,
    ACCOUNT_CREATE_FAIL,
    ACCOUNT_UPDATE_SUCCESS,
    ACCOUNT_UPDATE_FAIL,
    ACCOUNT_DELETE_SUCCESS,
    ACCOUNT_DELETE_FAIL
} from './types';

// Load all accounts
export const loadAccounts = () => async dispatch => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/accounts/`);
        dispatch({
            type: ACCOUNT_LOADED_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: ACCOUNT_LOADED_FAIL,
            payload: err.response.data // Include error details
        });
    }
};

// Create an account
export const createAccount = (accountData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/accounts/`, accountData, config);
        dispatch({
            type: ACCOUNT_CREATE_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: ACCOUNT_CREATE_FAIL,
            payload: err.response.data // Include error details
        });
    }
};

// Update an account
export const updateAccount = (id, accountData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.put(`${process.env.REACT_APP_API_URL}/api/accounts/${id}/`, accountData, config);
        dispatch({
            type: ACCOUNT_UPDATE_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: ACCOUNT_UPDATE_FAIL,
            payload: err.response.data // Include error details
        });
    }
};

// Delete an account
export const deleteAccount = (id) => async dispatch => {
    try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/accounts/${id}/`);
        dispatch({
            type: ACCOUNT_DELETE_SUCCESS,
            payload: id
        });
    } catch (err) {
        dispatch({
            type: ACCOUNT_DELETE_FAIL,
            payload: err.response.data // Include error details
        });
    }
};
