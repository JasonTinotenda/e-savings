import { SET_BALANCE, SET_TRANSACTION_HISTORY, ADD_TRANSACTION } from '../actions/transactions';

const initialState = {
    balance: 0,
    transactionHistory: [],
};

const transactionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_BALANCE:
            return {
                ...state,
                balance: action.payload,
            };
        case SET_TRANSACTION_HISTORY:
            return {
                ...state,
                transactionHistory: action.payload,
            };
        case ADD_TRANSACTION:
            return {
                ...state,
                transactionHistory: [...state.transactionHistory, action.payload],
            };
        default:
            return state;
    }
};

export default transactionsReducer;
