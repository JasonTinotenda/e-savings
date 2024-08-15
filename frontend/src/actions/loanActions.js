import axios from 'axios';

// Action Types
export const FETCH_LOANS_REQUEST = 'FETCH_LOANS_REQUEST';
export const FETCH_LOANS_SUCCESS = 'FETCH_LOANS_SUCCESS';
export const FETCH_LOANS_FAILURE = 'FETCH_LOANS_FAILURE';

export const FETCH_LOAN_DETAILS_REQUEST = 'FETCH_LOAN_DETAILS_REQUEST';
export const FETCH_LOAN_DETAILS_SUCCESS = 'FETCH_LOAN_DETAILS_SUCCESS';
export const FETCH_LOAN_DETAILS_FAILURE = 'FETCH_LOAN_DETAILS_FAILURE';

export const CREATE_LOAN_REQUEST = 'CREATE_LOAN_REQUEST';
export const CREATE_LOAN_SUCCESS = 'CREATE_LOAN_SUCCESS';
export const CREATE_LOAN_FAILURE = 'CREATE_LOAN_FAILURE';

export const UPDATE_LOAN_REQUEST = 'UPDATE_LOAN_REQUEST';
export const UPDATE_LOAN_SUCCESS = 'UPDATE_LOAN_SUCCESS';
export const UPDATE_LOAN_FAILURE = 'UPDATE_LOAN_FAILURE';

export const DELETE_LOAN_REQUEST = 'DELETE_LOAN_REQUEST';
export const DELETE_LOAN_SUCCESS = 'DELETE_LOAN_SUCCESS';
export const DELETE_LOAN_FAILURE = 'DELETE_LOAN_FAILURE';

// Action Creators

// Fetch all loans
const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
export const fetchLoans = () => async (dispatch) => {
    dispatch({ type: FETCH_LOANS_REQUEST });
    try {
        const { data } = await axios.get(`${REACT_APP_API_URL}/loans/`);
        dispatch({ type: FETCH_LOANS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: FETCH_LOANS_FAILURE, payload: error.message });
    }
};

// Fetch loan details
export const fetchLoanDetails = (id) => async (dispatch) => {
    dispatch({ type: FETCH_LOAN_DETAILS_REQUEST });
    try {
        const { data } = await axios.get(`${REACT_APP_API_URL}/loans/${id}/`);
        dispatch({ type: FETCH_LOAN_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: FETCH_LOAN_DETAILS_FAILURE, payload: error.message });
    }
};

// Create a loan
export const createLoan = (loanData) => async (dispatch) => {
    dispatch({ type: CREATE_LOAN_REQUEST });
    try {
        const { data } = await axios.post(`${REACT_APP_API_URL}/loans/`, loanData, {
            headers: { 'Content-Type': 'application/json' },
        });
        dispatch({ type: CREATE_LOAN_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: CREATE_LOAN_FAILURE, payload: error.message });
    }
};

// Update a loan
export const updateLoan = (id, loanData) => async (dispatch) => {
    dispatch({ type: UPDATE_LOAN_REQUEST });
    try {
        const { data } = await axios.put(`${REACT_APP_API_URL}/loans/${id}/`, loanData, {
            headers: { 'Content-Type': 'application/json' },
        });
        dispatch({ type: UPDATE_LOAN_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: UPDATE_LOAN_FAILURE, payload: error.message });
    }
};

// Delete a loan
export const deleteLoan = (id) => async (dispatch) => {
    dispatch({ type: DELETE_LOAN_REQUEST });
    try {
        await axios.delete(`${REACT_APP_API_URL}/loans/${id}/`);
        dispatch({ type: DELETE_LOAN_SUCCESS, payload: id });
    } catch (error) {
        dispatch({ type: DELETE_LOAN_FAILURE, payload: error.message });
    }
};
