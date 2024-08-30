import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadTransactions } from '../actions/transactionActions';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const TransactionList = ({ loadTransactions, transactions, loading }) => {
    useEffect(() => {
        loadTransactions();
    }, [loadTransactions]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className='container mt-5'>
            <h1>Transaction List</h1>
            <Link to='/create-transaction' className='btn btn-primary mb-3'>Create Transaction</Link>
            <ul className='list-group'>
                {transactions.map(transaction => (
                    <li key={transaction.id} className='list-group-item'>
                        <Link to={`/transactions/${transaction.id}`}>
                            {`${transaction.transaction_type.charAt(0).toUpperCase() + transaction.transaction_type.slice(1)} of $${transaction.amount}`}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

TransactionList.propTypes = {
    loadTransactions: PropTypes.func.isRequired,
    transactions: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
    transactions: state.transaction.transactions,
    loading: state.transaction.loading
});

export default connect(mapStateToProps, { loadTransactions })(TransactionList);
