// src/redux/transactionSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

// Define initial state
const initialState = {
  transactions: [],
  transactionTypes: [],
  singleTransaction: null,
  loading: false,
  error: null
};

// Define async thunks
export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/transactions/`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchTransactionTypes = createAsyncThunk(
  'transactions/fetchTransactionTypes',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/transaction-types/`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchSingleTransaction = createAsyncThunk(
  'transactions/fetchSingleTransaction',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/transactions/${id}/`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const postTransaction = createAsyncThunk(
  'transactions/postTransaction',
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/transactions/`, data, {
        headers: { 'Content-Type': 'application/json' }
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Create slice
const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchTransactionTypes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTransactionTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.transactionTypes = action.payload;
      })
      .addCase(fetchTransactionTypes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSingleTransaction.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSingleTransaction.fulfilled, (state, action) => {
        state.loading = false;
        state.singleTransaction = action.payload;
      })
      .addCase(fetchSingleTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(postTransaction.pending, (state) => {
        state.loading = true;
      })
      .addCase(postTransaction.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions.push(action.payload);
      })
      .addCase(postTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default transactionSlice.reducer;
