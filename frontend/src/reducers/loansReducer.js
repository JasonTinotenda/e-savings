import {
    FETCH_LOANS_REQUEST,
    FETCH_LOANS_SUCCESS,
    FETCH_LOANS_FAILURE,
    FETCH_LOAN_DETAILS_REQUEST,
    FETCH_LOAN_DETAILS_SUCCESS,
    FETCH_LOAN_DETAILS_FAILURE,
    CREATE_LOAN_REQUEST,
    CREATE_LOAN_SUCCESS,
    CREATE_LOAN_FAILURE,
    UPDATE_LOAN_REQUEST,
    UPDATE_LOAN_SUCCESS,
    UPDATE_LOAN_FAILURE,
    DELETE_LOAN_REQUEST,
    DELETE_LOAN_SUCCESS,
    DELETE_LOAN_FAILURE,
} from '../actions/loanActions';

const initialState = {
    loans: [],
    loanDetails: null,
    loading: false,
    error: null,
};

// Fetch Loans Reducer
export const loanListReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_LOANS_REQUEST:
            return { ...state, loading: true };
        case FETCH_LOANS_SUCCESS:
            return { ...state, loading: false, loans: action.payload };
        case FETCH_LOANS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

// Fetch Loan Details Reducer
export const loanDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_LOAN_DETAILS_REQUEST:
            return { ...state, loading: true };
        case FETCH_LOAN_DETAILS_SUCCESS:
            return { ...state, loading: false, loanDetails: action.payload };
        case FETCH_LOAN_DETAILS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

// Create/Update Loan Reducer
export const loanCreateUpdateReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_LOAN_REQUEST:
        case UPDATE_LOAN_REQUEST:
            return { ...state, loading: true };
        case CREATE_LOAN_SUCCESS:
        case UPDATE_LOAN_SUCCESS:
            return { ...state, loading: false, loanDetails: action.payload };
        case CREATE_LOAN_FAILURE:
        case UPDATE_LOAN_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

// Delete Loan Reducer
export const loanDeleteReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_LOAN_REQUEST:
            return { ...state, loading: true };
        case DELETE_LOAN_SUCCESS:
            return {
                ...state,
                loading: false,
                loans: state.loans.filter((loan) => loan.id !== action.payload),
            };
        case DELETE_LOAN_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
