import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchTransactionTypes } from '../redux/actions/transactionActions';

const TransactionTypeComponent = () => {
  const dispatch = useDispatch();
  const [transactionTypes, setTransactionTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTransactionTypes = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await dispatch(fetchTransactionTypes());
        setTransactionTypes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadTransactionTypes();
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
