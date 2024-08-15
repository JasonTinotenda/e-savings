import axios from 'axios';

// Action Types
export const SET_BALANCE = 'SET_BALANCE';
export const SET_TRANSACTION_HISTORY = 'SET_TRANSACTION_HISTORY';
export const ADD_TRANSACTION = 'ADD_TRANSACTION';
export const TRANSACTION_ERROR = 'TRANSACTION_ERROR';

// Action Creators
export const fetchAccountData = (accountId) => async (dispatch) => {
    try {
        const resBalance = await axios.get(`/api/accounts/${accountId}/balance/`);
        const resHistory = await axios.get(`/api/accounts/${accountId}/transactions/`);
        dispatch({ type: SET_BALANCE, payload: resBalance.data.balance });
        dispatch({ type: SET_TRANSACTION_HISTORY, payload: resHistory.data });
    } catch (error) {
        console.error('Error fetching account data:', error);
    }
};

export const submitTransaction = (accountId, transaction) => async (dispatch) => {
    try {
        const res = await axios.post(`/api/transactions/`, {
            account: accountId,
            transaction_type: transaction.transactionType,
            amount: parseFloat(transaction.amount),
        });
        dispatch({ type: ADD_TRANSACTION, payload: res.data.transaction });
        dispatch({ type: SET_BALANCE, payload: res.data.balance });
    } catch (error) {
        console.error('Error processing transaction:', error);
    }
};
