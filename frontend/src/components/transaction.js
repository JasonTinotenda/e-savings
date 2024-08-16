// src/components/TransactionsComponent.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchTransactions,
  fetchTransactionTypes,
  fetchSingleTransaction,
  postTransaction
} from '../redux/actions';

const TransactionsComponent = () => {
  const dispatch = useDispatch();
  const { transactions, transactionTypes, singleTransaction, loading, error } = useSelector(state => state);

  useEffect(() => {
    dispatch(fetchTransactions());
    dispatch(fetchTransactionTypes());
    dispatch(fetchSingleTransaction(2)); // Fetch transaction with ID 2 as an example

    // Example data for posting a new transaction
    const transactionData = {
      account: "1",
      amount: "907000",
      account_id: "1",
      transaction_type: "1"
    };
    dispatch(postTransaction(transactionData));
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Transactions</h1>
      <pre>{JSON.stringify(transactions, null, 2)}</pre>
      <h1>Transaction Types</h1>
      <pre>{JSON.stringify(transactionTypes, null, 2)}</pre>
      <h1>Single Transaction</h1>
      <pre>{JSON.stringify(singleTransaction, null, 2)}</pre>
    </div>
  );
};

export default TransactionsComponent;
