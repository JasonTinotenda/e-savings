import axios from 'axios';
import React, { useEffect, useState } from 'react';

const LoanTracking = () => {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/loans/tracking/', {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      setLoans(response.data);
    })
    .catch(error => {
      console.error('There was an error fetching the loan tracking data!', error);
    });
  }, []);

  return (
    <div>
      <h2>Loan Tracking</h2>
      <ul>
        {loans.map(loan => (
          <li key={loan.id}>
            Amount: {loan.amount}, Status: {loan.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LoanTracking;
