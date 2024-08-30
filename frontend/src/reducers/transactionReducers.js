import {
    TRANSACTION_LOADED_SUCCESS,
    TRANSACTION_LOADED_FAIL,
    TRANSACTION_CREATE_SUCCESS,
    TRANSACTION_CREATE_FAIL,
    TRANSACTION_UPDATE_SUCCESS,
    TRANSACTION_UPDATE_FAIL,
    TRANSACTION_DELETE_SUCCESS,
    TRANSACTION_DELETE_FAIL
} from '../actions/types';

const initialState = {
    transactions: [],
    transaction: null,
    updatedTransaction: null, // Track updated transaction
    loading: true,
    error: {}
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case TRANSACTION_LOADED_SUCCESS:
            return {
                ...state,
                transactions: payload,
                loading: false
            };

        case TRANSACTION_CREATE_SUCCESS:
            return {
                ...state,
                transactions: [...state.transactions, payload],
                loading: false
            };

        case TRANSACTION_UPDATE_SUCCESS:
            return {
                ...state,
                updatedTransaction: payload,
                transactions: state.transactions.map(transaction => 
                    transaction.id === payload.id ? payload : transaction
                ),
                loading: false
            };

        case TRANSACTION_DELETE_SUCCESS:
            return {
                ...state,
                transactions: state.transactions.filter(transaction => transaction.id !== payload),
                loading: false
            };

        case TRANSACTION_LOADED_FAIL:
        case TRANSACTION_CREATE_FAIL:
        case TRANSACTION_UPDATE_FAIL:
        case TRANSACTION_DELETE_FAIL:
            return {
                ...state,
                error: payload,
                loading: false
            };

        default:
            return state;
    }
};
