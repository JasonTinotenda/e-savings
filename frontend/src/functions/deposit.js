import axios from 'axios';
import React, { useState } from 'react';

const DepositFunds = ({ accountNumber }) => {
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:8000/api/savings/deposit/${accountNumber}/`, {
      amount: amount,
    }, {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      console.log('Deposit successful:', response.data);
    })
    .catch(error => {
      console.error('There was an error depositing the funds!', error);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" required />
      <button type="submit">Deposit</button>
    </form>
  );
};

export default DepositFunds;
