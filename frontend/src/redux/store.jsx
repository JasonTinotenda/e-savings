import { configureStore } from '@reduxjs/toolkit';
import loanReducer from './LoanSlice';

export const store = configureStore({
  reducer: {
    loans: loanReducer,
  },
});

export default store;
