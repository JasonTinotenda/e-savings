import {
    FETCH_ACCOUNT_DATA_REQUEST,
    FETCH_ACCOUNT_DATA_SUCCESS,
    FETCH_ACCOUNT_DATA_FAILURE,
    SUBMIT_TRANSACTION_REQUEST,
    SUBMIT_TRANSACTION_SUCCESS,
    SUBMIT_TRANSACTION_FAILURE,
} from '../actions/transactionActions';

const initialState = {
    balance: 0,
    transactionHistory: [],
    loading: false,
    error: null,
};

// Fetch Account Data Reducer
export const transactionReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ACCOUNT_DATA_REQUEST:
            return { ...state, loading: true };
        case FETCH_ACCOUNT_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                balance: action.payload.balance,
                transactionHistory: action.payload.transactions,
            };
        case FETCH_ACCOUNT_DATA_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case SUBMIT_TRANSACTION_REQUEST:
            return { ...state, loading: true };
        case SUBMIT_TRANSACTION_SUCCESS:
            return {
                ...state,
                loading: false,
                balance: action.payload.balance,
                transactionHistory: [...state.transactionHistory, action.payload.transaction],
            };
        case SUBMIT_TRANSACTION_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
