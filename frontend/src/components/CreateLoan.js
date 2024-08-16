import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createLoan } from '../redux/actions/loanActions';

const CreateLoanComponent = () => {
  const dispatch = useDispatch();
  const [loanData, setLoanData] = useState({
    amount: '',
    loanType: ''
  });

  const [loading, setLoading] = useState(false); // Local state for loading status
  const [error, setError] = useState(null); // Local state for error handling

  const handleChange = (e) => {
    setLoanData({
      ...loanData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when the creation process starts
    setError(null); // Reset the error state before submission
    try {
      await dispatch(createLoan(loanData)); // Dispatch the createLoan action
      setLoading(false); // Set loading to false once the process is complete
      setLoanData({ amount: '', loanType: '' }); // Reset form after successful submission
    } catch (err) {
      setError(err.message); // Set the error message in case of failure
      setLoading(false); // Set loading to false even if there is an error
    }
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
            disabled={loading} // Disable input during loading
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
            disabled={loading} // Disable input during loading
          />
        </div>
        <button type="submit" disabled={loading}>Create Loan</button> {/* Disable the button during loading */}
      </form>
    </div>
  );
};

export default CreateLoanComponent;
