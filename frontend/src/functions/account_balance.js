import axios from 'axios';
import React, { useEffect, useState } from 'react';

const AccountBalance = ({ accountNumber }) => {
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/savings/balance/${accountNumber}/`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      setBalance(response.data.balance);
    })
    .catch(error => {
      console.error('There was an error fetching the account balance!', error);
    });
  }, [accountNumber]);

  return (
    <div>
      <h2>Account Balance</h2>
      <p>Balance: {balance !== null ? `${balance} USD` : 'Loading...'}</p>
    </div>
  );
};

export default AccountBalance;
