import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createLoanRepayment } from '../redux/actions/loanActions';

const CreateRepaymentComponent = ({ loanId }) => {
  const dispatch = useDispatch();
  const [repaymentData, setRepaymentData] = useState({
    amount: '',
    date: ''
  });

  const [loading, setLoading] = useState(false); // Local state for loading status
  const [error, setError] = useState(null); // Local state for error handling

  const handleChange = (e) => {
    setRepaymentData({
      ...repaymentData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when the creation process starts
    setError(null); // Reset the error state before submission
    try {
      await dispatch(createLoanRepayment(loanId, repaymentData)); // Dispatch the createLoanRepayment action
      setLoading(false); // Set loading to false once the process is complete
      setRepaymentData({ amount: '', date: '' }); // Reset form after successful submission
    } catch (err) {
      setError(err.message); // Set the error message in case of failure
      setLoading(false); // Set loading to false even if there is an error
    }
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
            disabled={loading} // Disable input during loading
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
            disabled={loading} // Disable input during loading
          />
        </div>
        <button type="submit" disabled={loading}>Create Repayment</button> {/* Disable the button during loading */}
      </form>
    </div>
  );
};

export default CreateRepaymentComponent;
