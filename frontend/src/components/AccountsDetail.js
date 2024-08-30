import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { loadAccounts, updateAccount, deleteAccount } from '../actions/accountsActions';
import { useParams, Navigate } from 'react-router-dom';
import Spinner from './Spinner'; // Assume you have a Spinner component for loading

const AccountDetail = ({ loadAccounts, updateAccount, deleteAccount, account, loading, error }) => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        account_number: '',
        balance: ''
    });

    useEffect(() => {
        loadAccounts();
    }, [loadAccounts]);

    useEffect(() => {
        if (account) {
            setFormData({
                account_number: account.account_number,
                balance: account.balance
            });
        }
    }, [account]);

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        updateAccount(id, formData);
    };

    const onDelete = () => {
        deleteAccount(id);
    };

    if (loading) {
        return <Spinner />;
    }

    if (error) {
        return <p className="text-danger">Error: {error.message}</p>;
    }

    if (!account) {
        return <Navigate to='/accounts' />;
    }

    return (
        <div className='container mt-5'>
            <h1>Account Detail</h1>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label htmlFor='account_number'>Account Number</label>
                    <input 
                        className='form-control'
                        type='text' 
                        name='account_number'
                        id='account_number'
                        value={formData.account_number}
                        onChange={onChange}
                        required
                        disabled
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='balance'>Balance</label>
                    <input 
                        className='form-control'
                        type='number' 
                        name='balance'
                        id='balance'
                        value={formData.balance}
                        onChange={onChange}
                        required
                    />
                </div>
                <button className='btn btn-primary' type='submit'>Update</button>
                <button className='btn btn-danger ml-2' type='button' onClick={onDelete}>Delete</button>
            </form>
        </div>
    );
};

const mapStateToProps = (state, ownProps) => ({
    account: state.account.accounts.find(acc => acc.id === parseInt(ownProps.params.id, 10)), // Adjusted for `useParams` change
    loading: state.account.loading,
    error: state.account.error
});

export default connect(mapStateToProps, { loadAccounts, updateAccount, deleteAccount })(AccountDetail);
