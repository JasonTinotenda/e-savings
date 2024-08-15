import axios from 'axios';

const API_URL = 'http://localhost:8000/api/'; // Replace with your Django backend URL

export const getAccounts = () => axios.get(`${API_URL}/accounts/`);

export const getAccountBalance = (accountId) => axios.get(`${API_URL}/accounts/${accountId}/balance/`);

export const getTransactions = () => axios.get(`${API_URL}/transactions/`);

export const createTransaction = (transactionData) => axios.post(`${API_URL}/transactions/`);

export const getTransactionTypes = () => axios.get(`${API_URL}/transaction-types/`);
