import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axiosInstance';

// Initial state for accounts
const initialAccountState = {
  accounts: [],
  account: null,
  loading: false,
  error: null,
};

// Async thunks for account operations
export const fetchAccounts = createAsyncThunk('accounts/fetchAccounts', async () => {
  const { data } = await axiosInstance.get('/accounts/');
  return data;
});

export const fetchAccount = createAsyncThunk('accounts/fetchAccount', async (accountId) => {
  const { data } = await axiosInstance.get(`/accounts/${accountId}/`);
  return data;
});

export const createAccount = createAsyncThunk('accounts/createAccount', async (accountData) => {
  const { data } = await axiosInstance.post('/accounts/', accountData);
  return data;
});

export const updateAccount = createAsyncThunk('accounts/updateAccount', async ({ accountId, accountData }) => {
  const { data } = await axiosInstance.put(`/accounts/${accountId}/`, accountData);
  return data;
});

export const deleteAccount = createAsyncThunk('accounts/deleteAccount', async (accountId) => {
  await axiosInstance.delete(`/accounts/${accountId}/`);
  return accountId;
});

// Slice for account
const accountSlice = createSlice({
  name: 'accounts',
  initialState: initialAccountState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAccounts.fulfilled, (state, action) => {
        state.accounts = action.payload;
        state.loading = false;
      })
      .addCase(fetchAccounts.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(fetchAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAccount.fulfilled, (state, action) => {
        state.account = action.payload;
        state.loading = false;
      })
      .addCase(fetchAccount.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(createAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAccount.fulfilled, (state, action) => {
        state.accounts.push(action.payload);
        state.loading = false;
      })
      .addCase(createAccount.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(updateAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAccount.fulfilled, (state, action) => {
        state.accounts = state.accounts.map(account =>
          account.id === action.payload.id ? action.payload : account
        );
        state.loading = false;
      })
      .addCase(updateAccount.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(deleteAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        state.accounts = state.accounts.filter(account => account.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  }
});

export default accountSlice.reducer;
