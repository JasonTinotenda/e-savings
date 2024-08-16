import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createLoan } from '../redux/actions/loanActions';

const CreateLoanComponent = () => {
  const dispatch = useDispatch();
  const [loanData, setLoanData] = useState({
    amount: '',
    loanType: ''
  });

  const loading = useSelector(state => state.loans.loading);
  const error = useSelector(state => state.loans.error);

  const handleChange = (e) => {
    setLoanData({
      ...loanData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createLoan(loanData));
  };

  return (
    <div>
      <h2>Create Loan</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Amount</label>
          <input
            type="number"
            name="amount"
            value={loanData.amount}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Loan Type</label>
          <input
            type="text"
            name="loanType"
            value={loanData.loanType}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Create Loan</button>
      </form>
    </div>
  );
};

export default CreateLoanComponent;
