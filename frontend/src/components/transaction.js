import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchAccountData, submitTransaction } from '../actions/transactions';

const Transactions = ({ balance, transactionHistory, fetchAccountData, submitTransaction }) => {
    const { accountId } = useParams();
    const [transaction, setTransaction] = useState({
        transactionType: 'deposit',
        amount: 0,
    });

    useEffect(() => {
        fetchAccountData(accountId);
    }, [accountId, fetchAccountData]);

    const handleTransactionChange = (e) => {
        setTransaction({
            ...transaction,
            [e.target.name]: e.target.value,
        });
    };

    const handleTransactionSubmit = (e) => {
        e.preventDefault();
        submitTransaction(accountId, transaction);
        setTransaction({ transactionType: 'deposit', amount: 0 }); // Reset form
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
                    <label htmlFor="transactionType" className="form-label">Transaction Type</label>
                    <select
                        id="transactionType"
                        name="transactionType"
                        className="form-select"
                        value={transaction.transactionType}
                        onChange={handleTransactionChange}
                    >
                        <option value="deposit">Deposit</option>
                        <option value="withdraw">Withdraw</option>
                        <option value="loan">Loan</option>
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

                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Submit Transaction</button>
                </div>
            </form>

            <div className="mt-5">
                <h3>Transaction History</h3>
                <ul className="list-group">
                    {transactionHistory.map((trans, index) => (
                        <li key={index} className="list-group-item">
                            {trans.transaction_type} of ${trans.amount.toFixed(2)} on {new Date(trans.created_at).toLocaleString()}
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
