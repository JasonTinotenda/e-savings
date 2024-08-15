import axios from 'axios';

// Action Types
export const FETCH_ACCOUNT_DATA_REQUEST = 'FETCH_ACCOUNT_DATA_REQUEST';
export const FETCH_ACCOUNT_DATA_SUCCESS = 'FETCH_ACCOUNT_DATA_SUCCESS';
export const FETCH_ACCOUNT_DATA_FAILURE = 'FETCH_ACCOUNT_DATA_FAILURE';

export const SUBMIT_TRANSACTION_REQUEST = 'SUBMIT_TRANSACTION_REQUEST';
export const SUBMIT_TRANSACTION_SUCCESS = 'SUBMIT_TRANSACTION_SUCCESS';
export const SUBMIT_TRANSACTION_FAILURE = 'SUBMIT_TRANSACTION_FAILURE';

// Fetch account data (balance and transaction history)
const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
export const fetchAccountData = (accountId) => async (dispatch) => {
    dispatch({ type: FETCH_ACCOUNT_DATA_REQUEST });
    try {
        const { data } = await axios.get(`${REACT_APP_API_URL}/accounts/${accountId}/transactions/`);
        dispatch({ type: FETCH_ACCOUNT_DATA_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: FETCH_ACCOUNT_DATA_FAILURE, payload: error.message });
    }
};

// Submit a transaction (deposit, withdraw, loan)
export const submitTransaction = (accountId, transaction) => async (dispatch) => {
    dispatch({ type: SUBMIT_TRANSACTION_REQUEST });
    try {
        const { data } = await axios.post(`${REACT_APP_API_URL}/transactions/`, transaction, {
            headers: { 'Content-Type': 'application/json' },
        });
        dispatch({ type: SUBMIT_TRANSACTION_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: SUBMIT_TRANSACTION_FAILURE, payload: error.message });
    }
};
