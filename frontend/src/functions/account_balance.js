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

  if (balance === null) return <div>Loading...</div>;

  return (
    <div>
      <h1>Account Balance</h1>
      <p>Balance: {balance}</p>
    </div>
  );
};

export default AccountBalance;
