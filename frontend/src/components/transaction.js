// components/Transactions.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchAccountData, submitTransaction } from '../actions/transactionActions';

const Transactions = ({ balance, transactionHistory, fetchAccountData, submitTransaction }) => {
    const { account_id } = useParams();
    const [transaction, setTransaction] = useState({
        transaction_type: 'deposit',
        amount: 0,
        description: '',
    });

    useEffect(() => {
        fetchAccountData(account_id);
    }, [account_id, fetchAccountData]);

    const handleTransactionChange = (e) => {
        setTransaction({
            ...transaction,
            [e.target.name]: e.target.value,
        });
    };

    const handleTransactionSubmit = (e) => {
        e.preventDefault();
        submitTransaction(account_id, transaction);
        setTransaction({ transaction_type: 'deposit', amount: 0, description: '' }); // Reset form
    };

    return (
        <div className="container">
            <h1 className="my-4">Account Transactions</h1>

            <div className="row mb-4">
                <div className="col-12">
                    <h2>Current Balance: ${balance.toFixed(2)}</h2>
                </div>
            </div>

            <form onSubmit={handleTransactionSubmit} className="row g-3">
                <div className="col-md-6">
                    <label htmlFor="amount_id" className="form-label">AccountID</label>
                    <input
                        type="number"
                        id="account_id"
                        name="account_id"
                        className="form-control"
                        value={transaction.account_id}
                        onChange={handleTransactionChange}
                        min="0"
                        required
                    />
                </div>
                <div className="col-md-6">
                    <label htmlFor="transactionType" className="form-label">Transaction Type</label>
                    <select
                        id="transactionType"
                        name="transactionType"
                        className="form-select"
                        value={transaction.transaction_type}
                        onChange={handleTransactionChange}
                    >
                        <option value="2">Deposit</option>
                        <option value="1">Withdraw</option>
                        <option value="3">Loan</option>
                    </select>
                </div>

                <div className="col-md-6">
                    <label htmlFor="amount" className="form-label">Amount</label>
                    <input
                        type="number"
                        id="amount"
                        name="amount"
                        className="form-control"
                        value={transaction.amount}
                        onChange={handleTransactionChange}
                        min="0"
                        required
                    />
                </div>

                <div className="col-md-12">
                    <label htmlFor="description" className="form-label">Description (optional)</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        className="form-control"
                        value={transaction.description}
                        onChange={handleTransactionChange}
                    />
                </div>

                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Submit Transaction</button>
                </div>
            </form>

            <div className="mt-5">
                <h3>Transaction History</h3>
                <ul className="list-group">
                    {transactionHistory.map((trans, index) => (
                        <li key={index} className="list-group-item">
                            {trans.transaction_type} of ${trans.amount.toFixed(2)} on {new Date(trans.transaction_date).toLocaleString()}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    balance: state.transactions.balance,
    transactionHistory: state.transactions.transactionHistory,
});

export default connect(mapStateToProps, { fetchAccountData, submitTransaction })(Transactions);
