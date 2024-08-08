import axios from 'axios';
import React, { useState } from 'react';

const WithdrawFunds = ({ accountNumber }) => {
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:8000/api/savings/withdraw/${accountNumber}/`, {
      amount: amount,
    }, {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      console.log('Withdrawal successful:', response.data);
      setAmount('');
    })
    .catch(error => {
      console.error('There was an error withdrawing funds!', error);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" required />
      <button type="submit">Withdraw</button>
    </form>
  );
};

export default WithdrawFunds;
