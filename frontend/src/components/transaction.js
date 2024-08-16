import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactions, fetchTransactionTypes, fetchSingleTransaction, postTransaction } from '../redux/transactionlice';

const TransactionsComponent = () => {
  const dispatch = useDispatch();
  
  // Extract data and states from Redux store
  const transactions = useSelector((state) => state.transactions.transactions);
  const transactionTypes = useSelector((state) => state.transactions.transactionTypes);
  const singleTransaction = useSelector((state) => state.transactions.singleTransaction);
  const loading = useSelector((state) => state.transactions.loading);
  const error = useSelector((state) => state.transactions.error);

  useEffect(() => {
    // Fetch initial data
    dispatch(fetchTransactions());
    dispatch(fetchTransactionTypes());
    dispatch(fetchSingleTransaction(2)); // Fetch transaction with ID 2

    // Example data for posting a new transaction
    const transactionData = {
      account: "1",
      amount: "907000",
      account_id: "1",
      transaction_type: "1"
    };
    dispatch(postTransaction(transactionData));
  }, [dispatch]);

  return (
    <div>
      <h1>Transactions</h1>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      <h2>All Transactions</h2>
      <pre>{JSON.stringify(transactions, null, 2)}</pre>
      <h2>Transaction Types</h2>
      <pre>{JSON.stringify(transactionTypes, null, 2)}</pre>
      <h2>Single Transaction</h2>
      <pre>{JSON.stringify(singleTransaction, null, 2)}</pre>
    </div>
  );
};

export default TransactionsComponent;
