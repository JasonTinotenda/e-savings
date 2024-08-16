// src/components/AccountComponent.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccounts, fetchAccountBalance } from '../redux/actions/accountActions';

const AccountComponent = () => {
  const dispatch = useDispatch();
  const { accounts, accountBalance, loading, error } = useSelector(state => state);

  useEffect(() => {
    dispatch(fetchAccounts());
    dispatch(fetchAccountBalance(1)); // Fetch balance for account with ID 1 as an example
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Accounts</h1>
      <pre>{JSON.stringify(accounts, null, 2)}</pre>
      <h1>Account Balance</h1>
      <pre>{JSON.stringify(accountBalance, null, 2)}</pre>
    </div>
  );
};

export default AccountComponent;
