import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createLoanRepayment } from '../redux/actions/loanActions';

const CreateRepaymentComponent = ({ loanId }) => {
  const dispatch = useDispatch();
  const [repaymentData, setRepaymentData] = useState({
    amount: '',
    date: ''
  });

  const loading = useSelector(state => state.loans.loading);
  const error = useSelector(state => state.loans.error);

  const handleChange = (e) => {
    setRepaymentData({
      ...repaymentData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createLoanRepayment(loanId, repaymentData));
  };

  return (
    <div>
      <h2>Create Loan Repayment</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Amount</label>
          <input
            type="number"
            name="amount"
            value={repaymentData.amount}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={repaymentData.date}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Create Repayment</button>
      </form>
    </div>
  );
};

export default CreateRepaymentComponent;
