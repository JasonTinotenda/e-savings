import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAccounts, fetchAccountBalance } from '../redux/actions/accountActions';

const AccountComponent = () => {
  const dispatch = useDispatch();
  const [accounts, setAccounts] = useState([]); // Local state for accounts
  const [accountBalance, setAccountBalance] = useState(null); // Local state for account balance
  const [loading, setLoading] = useState(false); // Local state for loading status
  const [error, setError] = useState(null); // Local state for error handling

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true while fetching data
      try {
        const accountsResult = await dispatch(fetchAccounts()); // Fetch accounts using Redux action
        setAccounts(accountsResult.payload); // Update local state with fetched accounts

        const balanceResult = await dispatch(fetchAccountBalance(1)); // Fetch balance for account with ID 1 as an example
        setAccountBalance(balanceResult.payload); // Update local state with fetched balance

        setLoading(false); // Set loading to false once data is fetched
      } catch (err) {
        setError(err.message); // Set error message if fetching data fails
        setLoading(false); // Set loading to false in case of error
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
