import axios from 'axios';
import React, { useState } from 'react';

const LoanApplication = () => {
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/loans/application/', {
      amount: amount,
      reason: reason
    }, {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      console.log('Loan application successful:', response.data);
      setAmount('');
      setReason('');
    })
    .catch(error => {
      console.error('There was an error applying for the loan!', error);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Loan Amount" required />
      <textarea value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Reason" required />
      <button type="submit">Apply for Loan</button>
    </form>
  );
};

export default LoanApplication;
