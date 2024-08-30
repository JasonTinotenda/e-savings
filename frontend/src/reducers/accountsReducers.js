import {
    ACCOUNT_LOADED_SUCCESS,
    ACCOUNT_LOADED_FAIL,
    ACCOUNT_CREATE_SUCCESS,
    ACCOUNT_CREATE_FAIL,
    ACCOUNT_UPDATE_SUCCESS,
    ACCOUNT_UPDATE_FAIL,
    ACCOUNT_DELETE_SUCCESS,
    ACCOUNT_DELETE_FAIL
} from '../actions/types';

const initialState = {
    accounts: [],
    account: null,
    loading: true,
    error: {}
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case ACCOUNT_LOADED_SUCCESS:
            return {
                ...state,
                accounts: payload,
                loading: false
            };

        case ACCOUNT_CREATE_SUCCESS:
        case ACCOUNT_UPDATE_SUCCESS:
            return {
                ...state,
                account: payload,
                accounts: state.accounts.map(acc => acc.id === payload.id ? payload : acc), // Update account list
                loading: false
            };

        case ACCOUNT_DELETE_SUCCESS:
            return {
                ...state,
                accounts: state.accounts.filter(account => account.id !== payload),
                loading: false
            };

        case ACCOUNT_LOADED_FAIL:
        case ACCOUNT_CREATE_FAIL:
        case ACCOUNT_UPDATE_FAIL:
        case ACCOUNT_DELETE_FAIL:
            return {
                ...state,
                error: payload,
                loading: false
            };

        default:
            return state;
    }
};
