// loanSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define initial state
const initialState = {
  loanTypes: [],
  loans: [],
  loanDetails: null,
  loanApproval: null,
  loanRepayments: [],
  loading: false,
  error: null
};

// Thunks for asynchronous actions
export const fetchLoanTypes = createAsyncThunk(
  'loans/fetchLoanTypes',
  async () => {
    const response = await axios.get('http://localhost:8000/api/loan-types/');
    return response.data;
  }
);

export const fetchLoans = createAsyncThunk(
  'loans/fetchLoans',
  async () => {
    const response = await axios.get('http://localhost:8000/api/loans/');
    return response.data;
  }
);

export const fetchLoanDetails = createAsyncThunk(
  'loans/fetchLoanDetails',
  async (loanId) => {
    const response = await axios.get(`http://localhost:8000/api/loans/${loanId}/`);
    return response.data;
  }
);

export const createLoan = createAsyncThunk(
  'loans/createLoan',
  async (loanData) => {
    const response = await axios.post('http://localhost:8000/api/loans/', loanData, {
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
  }
);

export const approveLoan = createAsyncThunk(
  'loans/approveLoan',
  async (loanId) => {
    const response = await axios.post(`http://localhost:8000/api/loans/${loanId}/approve/`, {}, {
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
  }
);

export const createLoanRepayment = createAsyncThunk(
  'loans/createLoanRepayment',
  async ({ loanId, repaymentData }) => {
    const response = await axios.post('http://localhost:8000/api/loan-repayments/', repaymentData, {
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
  }
);

// Create slice
const loanSlice = createSlice({
  name: 'loans',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoanTypes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLoanTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.loanTypes = action.payload;
      })
      .addCase(fetchLoanTypes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchLoans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLoans.fulfilled, (state, action) => {
        state.loading = false;
        state.loans = action.payload;
      })
      .addCase(fetchLoans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchLoanDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLoanDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.loanDetails = action.payload;
      })
      .addCase(fetchLoanDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createLoan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createLoan.fulfilled, (state, action) => {
        state.loading = false;
        state.loans.push(action.payload);
      })
      .addCase(createLoan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(approveLoan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(approveLoan.fulfilled, (state, action) => {
        state.loading = false;
        state.loanApproval = action.payload;
      })
      .addCase(approveLoan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createLoanRepayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createLoanRepayment.fulfilled, (state, action) => {
        state.loading = false;
        state.loanRepayments.push(action.payload);
      })
      .addCase(createLoanRepayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default loanSlice.reducer;
