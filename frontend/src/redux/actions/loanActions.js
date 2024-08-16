// loanActions.js
import axios from 'axios';
import {
  FETCH_LOAN_TYPES_REQUEST, FETCH_LOAN_TYPES_SUCCESS, FETCH_LOAN_TYPES_FAILURE,
  FETCH_LOANS_REQUEST, FETCH_LOANS_SUCCESS, FETCH_LOANS_FAILURE,
  FETCH_LOAN_DETAILS_REQUEST, FETCH_LOAN_DETAILS_SUCCESS, FETCH_LOAN_DETAILS_FAILURE,
  CREATE_LOAN_REQUEST, CREATE_LOAN_SUCCESS, CREATE_LOAN_FAILURE,
  APPROVE_LOAN_REQUEST, APPROVE_LOAN_SUCCESS, APPROVE_LOAN_FAILURE,
  CREATE_LOAN_REPAYMENT_REQUEST, CREATE_LOAN_REPAYMENT_SUCCESS, CREATE_LOAN_REPAYMENT_FAILURE
} from '../types/loanTypes';

// Fetch Loan Types
export const fetchLoanTypes = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_LOAN_TYPES_REQUEST });
    axios.get('http://localhost:8000/api/loan-types/')
      .then(response => dispatch({ type: FETCH_LOAN_TYPES_SUCCESS, payload: response.data }))
      .catch(error => dispatch({ type: FETCH_LOAN_TYPES_FAILURE, payload: error.message }));
  };
};

// Fetch Loans
export const fetchLoans = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_LOANS_REQUEST });
    axios.get('http://localhost:8000/api/loans/')
      .then(response => dispatch({ type: FETCH_LOANS_SUCCESS, payload: response.data }))
      .catch(error => dispatch({ type: FETCH_LOANS_FAILURE, payload: error.message }));
  };
};

// Fetch Loan Details
export const fetchLoanDetails = (loanId) => {
  return (dispatch) => {
    dispatch({ type: FETCH_LOAN_DETAILS_REQUEST });
    axios.get(`http://localhost:8000/api/loans/${loanId}/`)
      .then(response => dispatch({ type: FETCH_LOAN_DETAILS_SUCCESS, payload: response.data }))
      .catch(error => dispatch({ type: FETCH_LOAN_DETAILS_FAILURE, payload: error.message }));
  };
};

// Create Loan
export const createLoan = (loanData) => {
  return (dispatch) => {
    dispatch({ type: CREATE_LOAN_REQUEST });
    axios.post('http://localhost:8000/api/loans/', loanData, {
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => dispatch({ type: CREATE_LOAN_SUCCESS, payload: response.data }))
      .catch(error => dispatch({ type: CREATE_LOAN_FAILURE, payload: error.message }));
  };
};

// Approve Loan
export const approveLoan = (loanId) => {
  return (dispatch) => {
    dispatch({ type: APPROVE_LOAN_REQUEST });
    axios.post(`http://localhost:8000/api/loans/${loanId}/approve/`, {}, {
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => dispatch({ type: APPROVE_LOAN_SUCCESS, payload: response.data }))
      .catch(error => dispatch({ type: APPROVE_LOAN_FAILURE, payload: error.message }));
  };
};

// Create Loan Repayment
export const createLoanRepayment = (loanId, repaymentData) => {
  return (dispatch) => {
    dispatch({ type: CREATE_LOAN_REPAYMENT_REQUEST });
    axios.post('http://localhost:8000/api/loan-repayments/', repaymentData, {
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => dispatch({ type: CREATE_LOAN_REPAYMENT_SUCCESS, payload: response.data }))
      .catch(error => dispatch({ type: CREATE_LOAN_REPAYMENT_FAILURE, payload: error.message }));
  };
};
