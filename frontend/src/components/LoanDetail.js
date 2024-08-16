import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchLoanDetails } from '../redux/actions/loanActions';

const LoanDetailComponent = ({ loanId }) => {
  const dispatch = useDispatch();
  const [loanDetails, setLoanDetails] = useState(null); // Local state for loan details
  const [loading, setLoading] = useState(true); // Local state for loading
  const [error, setError] = useState(null); // Local state for error

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await dispatch(fetchLoanDetails(loanId));
        setLoanDetails(result); // Assuming fetchLoanDetails returns the loan details
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [dispatch, loanId]);

  return (
    <div>
      <h2>Loan Details</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {loanDetails && (
        <div>
          <p>Amount: {loanDetails.amount}</p>
          <p>Status: {loanDetails.status}</p>
        </div>
      )}
    </div>
  );
};

export default LoanDetailComponent;
