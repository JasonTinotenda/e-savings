import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLoanDetails } from '../redux/loanSlice'; // Import the thunk from loanSlice

const LoanDetailComponent = ({ loanId }) => {
  const dispatch = useDispatch();
  const { loanDetails, loading, error } = useSelector((state) => state.loan);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        await dispatch(fetchLoanDetails(loanId)).unwrap(); // Dispatch the fetchLoanDetails action and unwrap the result
      } catch (err) {
        console.error('Failed to fetch loan details:', err.message); // Log error
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
          {/* Add more details as needed */}
        </div>
      )}
    </div>
  );
};

export default LoanDetailComponent;
