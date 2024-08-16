import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccounts } from '../redux/accountSlice';

const AccountComponent = () => {
  const dispatch = useDispatch();
  
  // Accessing state from Redux store
  const { accounts, accountBalance, loading, error } = useSelector(state => state.accounts);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchAccounts()); // Fetch accounts using Redux action
      } catch (err) {
        console.error('Failed to fetch accounts or balance:', err);
      }
    };
    fetchData();
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
