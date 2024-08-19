import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk to fetch loan data from Django backend
export const fetchLoanData = createAsyncThunk('loans/fetchLoanData', async () => {
  const response = await axios.get('/api/loans/');
  return response.data;
});

// Thunk to apply for a new loan
export const applyForLoan = createAsyncThunk('loans/applyForLoan', async (loanType) => {
  const response = await axios.post('/api/loan-applications/', { loan_type: loanType });
  return response.data;
});

// Thunk to approve a loan application
export const approveLoanApplication = createAsyncThunk('loans/approveLoanApplication', async (id) => {
  const response = await axios.post(`/api/loan-applications/${id}/approve/`);
  return response.data;
});

// Thunk to deny a loan application
export const denyLoanApplication = createAsyncThunk('loans/denyLoanApplication', async (id) => {
  const response = await axios.post(`/api/loan-applications/${id}/deny/`);
  return response.data;
});

const loanSlice = createSlice({
  name: 'loans',
  initialState: {
    loanAmount: 0,
    loanRepaid: 0,
    percentage: 0,
    isModalOpen: false,
    loanApplications: [],
  },
  reducers: {
    toggleModal: (state) => {
      state.isModalOpen = !state.isModalOpen;
    },
    setLoanApplications: (state, action) => {
      state.loanApplications = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoanData.fulfilled, (state, action) => {
        const loanData = action.payload;
        state.loanAmount = loanData.amount;
        state.loanRepaid = loanData.repaid_amount;
        state.percentage = loanData.percentage_repaid;
      })
      .addCase(applyForLoan.fulfilled, (state, action) => {
        // Handle post-loan application logic here
        // For example, add the new application to the list
        state.loanApplications.push(action.payload);
      })
      .addCase(approveLoanApplication.fulfilled, (state, action) => {
        // Update the loan application status
        const updatedApplication = action.payload;
        state.loanApplications = state.loanApplications.map(app =>
          app.id === updatedApplication.id ? updatedApplication : app
        );
      })
      .addCase(denyLoanApplication.fulfilled, (state, action) => {
        // Update the loan application status
        const updatedApplication = action.payload;
        state.loanApplications = state.loanApplications.map(app =>
          app.id === updatedApplication.id ? updatedApplication : app
        );
      });
  },
});

export const { toggleModal, setLoanApplications } = loanSlice.actions;

export default loanSlice.reducer;
