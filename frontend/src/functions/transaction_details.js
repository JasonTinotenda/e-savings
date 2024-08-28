import axios from 'axios';
import React, { useEffect, useState } from 'react';

const TransactionDetail = ({ transactionId }) => {
  const [transaction, setTransaction] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/transactions/transaction/${transactionId}/`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      setTransaction(response.data);
    })
    .catch(error => {
      console.error('There was an error fetching the transaction details!', error);
    });
  }, [transactionId]);

  if (!transaction) return <div>Loading...</div>;

  return (
    <div>
      <h1>Transaction Detail</h1>
      <p>Type: {transaction.transaction_type}</p>
      <p>Amount: {transaction.amount}</p>
      <p>Date: {new Date(transaction.date_created).toLocaleDateString()}</p>
    </div>
  );
};

export default TransactionDetail;
