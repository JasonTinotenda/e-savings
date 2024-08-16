// loanReducers.js
import {
    FETCH_LOAN_TYPES_REQUEST, FETCH_LOAN_TYPES_SUCCESS, FETCH_LOAN_TYPES_FAILURE,
    FETCH_LOANS_REQUEST, FETCH_LOANS_SUCCESS, FETCH_LOANS_FAILURE,
    FETCH_LOAN_DETAILS_REQUEST, FETCH_LOAN_DETAILS_SUCCESS, FETCH_LOAN_DETAILS_FAILURE,
    CREATE_LOAN_REQUEST, CREATE_LOAN_SUCCESS, CREATE_LOAN_FAILURE,
    APPROVE_LOAN_REQUEST, APPROVE_LOAN_SUCCESS, APPROVE_LOAN_FAILURE,
    CREATE_LOAN_REPAYMENT_REQUEST, CREATE_LOAN_REPAYMENT_SUCCESS, CREATE_LOAN_REPAYMENT_FAILURE
  } from '../types/loanTypes';
  
  const initialState = {
    loanTypes: [],
    loans: [],
    loanDetails: null,
    loanApproval: null,
    loanRepayments: [],
    loading: false,
    error: null
  };
  
  const loanReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_LOAN_TYPES_REQUEST:
      case FETCH_LOANS_REQUEST:
      case FETCH_LOAN_DETAILS_REQUEST:
      case CREATE_LOAN_REQUEST:
      case APPROVE_LOAN_REQUEST:
      case CREATE_LOAN_REPAYMENT_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        };
      case FETCH_LOAN_TYPES_SUCCESS:
        return {
          ...state,
          loading: false,
          loanTypes: action.payload
        };
      case FETCH_LOANS_SUCCESS:
        return {
          ...state,
          loading: false,
          loans: action.payload
        };
      case FETCH_LOAN_DETAILS_SUCCESS:
        return {
          ...state,
          loading: false,
          loanDetails: action.payload
        };
      case CREATE_LOAN_SUCCESS:
        return {
          ...state,
          loading: false,
          loans: [...state.loans, action.payload]
        };
      case APPROVE_LOAN_SUCCESS:
        return {
          ...state,
          loading: false,
          loanApproval: action.payload
        };
      case CREATE_LOAN_REPAYMENT_SUCCESS:
        return {
          ...state,
          loading: false,
          loanRepayments: [...state.loanRepayments, action.payload]
        };
      case FETCH_LOAN_TYPES_FAILURE:
      case FETCH_LOANS_FAILURE:
      case FETCH_LOAN_DETAILS_FAILURE:
      case CREATE_LOAN_FAILURE:
      case APPROVE_LOAN_FAILURE:
      case CREATE_LOAN_REPAYMENT_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  export default loanReducer;