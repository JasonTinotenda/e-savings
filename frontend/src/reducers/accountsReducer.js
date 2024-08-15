import {
    FETCH_ACCOUNT_REQUEST,
    FETCH_ACCOUNT_SUCCESS,
    FETCH_ACCOUNT_FAILURE,
    CREATE_ACCOUNT_REQUEST,
    CREATE_ACCOUNT_SUCCESS,
    CREATE_ACCOUNT_FAILURE,
    UPDATE_ACCOUNT_REQUEST,
    UPDATE_ACCOUNT_SUCCESS,
    UPDATE_ACCOUNT_FAILURE,
    DELETE_ACCOUNT_REQUEST,
    DELETE_ACCOUNT_SUCCESS,
    DELETE_ACCOUNT_FAILURE
} from '../actions/accountActions';

const initialState = {
    account: null,
    loading: false,
    error: null,
};

// Reducer
const accountReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ACCOUNT_REQUEST:
        case CREATE_ACCOUNT_REQUEST:
        case UPDATE_ACCOUNT_REQUEST:
        case DELETE_ACCOUNT_REQUEST:
            return { ...state, loading: true, error: null };

        case FETCH_ACCOUNT_SUCCESS:
            return { ...state, loading: false, account: action.payload };

        case CREATE_ACCOUNT_SUCCESS:
        case UPDATE_ACCOUNT_SUCCESS:
            return { ...state, loading: false, account: action.payload };

        case DELETE_ACCOUNT_SUCCESS:
            return { ...state, loading: false, account: null };

        case FETCH_ACCOUNT_FAILURE:
        case CREATE_ACCOUNT_FAILURE:
        case UPDATE_ACCOUNT_FAILURE:
        case DELETE_ACCOUNT_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};

export default accountReducer;
