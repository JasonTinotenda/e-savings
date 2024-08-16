// src/components/TransactionTypeComponent.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactionTypes } from '../redux/actions/transactionActions';

const TransactionTypeComponent = () => {
  const dispatch = useDispatch();
  const { transactionTypes, loading, error } = useSelector(state => state);

  useEffect(() => {
    dispatch(fetchTransactionTypes());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Transaction Types</h1>
      <pre>{JSON.stringify(transactionTypes, null, 2)}</pre>
    </div>
  );
};

export default TransactionTypeComponent;
