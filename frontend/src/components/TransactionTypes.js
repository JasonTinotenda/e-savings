import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactionTypes } from '../redux/transactionlice';

const TransactionTypeComponent = () => {
  const dispatch = useDispatch();
  
  // Extract data and states from Redux store
  const transactionTypes = useSelector((state) => state.transactions.transactionTypes);
  const loading = useSelector((state) => state.transactions.loading);
  const error = useSelector((state) => state.transactions.error);

  useEffect(() => {
    dispatch(fetchTransactionTypes());
  }, [dispatch]);

  return (
    <div>
      <h1>Transaction Types</h1>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      <pre>{JSON.stringify(transactionTypes, null, 2)}</pre>
    </div>
  );
};

export default TransactionTypeComponent;
