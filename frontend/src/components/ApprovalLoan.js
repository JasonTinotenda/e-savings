import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { approveLoan } from '../redux/actions/loanActions';

const ApproveLoanComponent = ({ loanId }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false); // Local state for loading status
  const [error, setError] = useState(null); // Local state for error handling

  const handleApprove = async () => {
    setLoading(true); // Set loading to true when the approval process starts
    try {
      await dispatch(approveLoan(loanId)); // Dispatch the approveLoan action
      setLoading(false); // Set loading to false once the process is complete
    } catch (err) {
      setError(err.message); // Set the error message in case of failure
      setLoading(false); // Set loading to false even if there is an error
    }
  };

  return (
    <div>
      <h2>Approve Loan</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <button onClick={handleApprove} disabled={loading}>Approve Loan</button> {/* Disable the button during loading */}
    </div>
  );
};

export default ApproveLoanComponent;
