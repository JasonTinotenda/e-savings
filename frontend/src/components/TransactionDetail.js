import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { loadTransactions, updateTransaction, deleteTransaction } from '../actions/transactionActions';
import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const TransactionDetail = ({ loadTransactions, updateTransaction, deleteTransaction, transaction, loading }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        amount: ''
    });

    useEffect(() => {
        loadTransactions();
    }, [loadTransactions]);

    useEffect(() => {
        if (transaction) {
            setFormData({
                amount: transaction.amount
            });
        }
    }, [transaction]);

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        updateTransaction(id, formData);
    };

    const onDelete = () => {
        deleteTransaction(id);
        navigate('/transactions');
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!transaction) {
        return <p>Transaction not found.</p>;
    }

    return (
        <div className='container mt-5'>
            <h1>Transaction Detail</h1>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label>Amount</label>
                    <input 
                        className='form-control'
                        type='number' 
                        name='amount'
                        value={formData.amount}
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

TransactionDetail.propTypes = {
    loadTransactions: PropTypes.func.isRequired,
    updateTransaction: PropTypes.func.isRequired,
    deleteTransaction: PropTypes.func.isRequired,
    transaction: PropTypes.object,
    loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
    transaction: state.transaction.transactions.find(trans => trans.id === parseInt(ownProps.params.id, 10)),
    loading: state.transaction.loading
});

export default connect(mapStateToProps, { loadTransactions, updateTransaction, deleteTransaction })(TransactionDetail);
