import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  fetchTransactions,
  fetchTransactionTypes,
  fetchSingleTransaction,
  postTransaction
} from '../redux/actions';

const TransactionsComponent = () => {
  const dispatch = useDispatch();
  const [transactions, setTransactions] = useState([]);
  const [transactionTypes, setTransactionTypes] = useState([]);
  const [singleTransaction, setSingleTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const transactionsData = await dispatch(fetchTransactions());
        setTransactions(transactionsData);
        
        const transactionTypesData = await dispatch(fetchTransactionTypes());
        setTransactionTypes(transactionTypesData);

        const singleTransactionData = await dispatch(fetchSingleTransaction(2)); // Fetch transaction with ID 2
        setSingleTransaction(singleTransactionData);

        // Example data for posting a new transaction
        const transactionData = {
          account: "1",
          amount: "907000",
          account_id: "1",
          transaction_type: "1"
        };
        await dispatch(postTransaction(transactionData));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
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
