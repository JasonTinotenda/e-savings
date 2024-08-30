import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadAccounts } from '../actions/accountsActions';
import { Link } from 'react-router-dom';
import Spinner from './Spinner'; // Assume you have a Spinner component for loading

const AccountsList = ({ loadAccounts, accounts, loading, error }) => {
    useEffect(() => {
        loadAccounts();
    }, [loadAccounts]);

    if (loading) {
        return <Spinner />;
    }

    if (error) {
        return <p className="text-danger">Error: {error.message}</p>;
    }

    return (
        <div className='container mt-5'>
            <h1>Account List</h1>
            <Link to='/create-account' className='btn btn-primary mb-3'>Create Account</Link>
            <ul className='list-group'>
                {accounts.length === 0 ? (
                    <p>No accounts found.</p>
                ) : (
                    accounts.map(account => (
                        <li key={account.id} className='list-group-item'>
                            <Link to={`/accounts/${account.id}`}>
                                {account.account_number} - Balance: {account.balance}
                            </Link>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

const mapStateToProps = state => ({
    accounts: state.account.accounts,
    loading: state.account.loading,
    error: state.account.error
});

export default connect(mapStateToProps, { loadAccounts })(AccountsList);
