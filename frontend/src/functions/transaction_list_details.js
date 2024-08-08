import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const Transactions = ({ refresh }) => {
  const [transactions, setTransactions] = useState([]);
  const [transaction, setTransaction] = useState(null);
  const { transaction_id } = useParams();

  useEffect(() => {
    axios.get('http://localhost:8000/api/transactions/', {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      setTransactions(response.data);
    })
    .catch(error => {
      console.error('There was an error fetching the transactions!', error);
    });
  }, [refresh]);

  useEffect(() => {
    if (transaction_id) {
      axios.get(`http://localhost:8000/api/transactions/transaction/${transaction_id}/`, {
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
    }
  }, [transaction_id]);

  return (
    <div>
      <h2>Transaction History</h2>
      <ul>
        {transactions.map(transaction => (
          <li key={transaction.id}>
            <Link to={`/transactions/transaction/${transaction.id}/`}>
              {transaction.transaction_type} of {transaction.amount} on {new Date(transaction.date_created).toLocaleDateString()}
            </Link>
          </li>
        ))}
      </ul>

      {transaction && (
        <div>
          <h1>Transaction Detail</h1>
          <p>Type: {transaction.transaction_type}</p>
          <p>Amount: {transaction.amount}</p>
          <p>Date: {new Date(transaction.date_created).toLocaleDateString()}</p>
        </div>
      )}
    </div>
  );
};

export default Transactions;
