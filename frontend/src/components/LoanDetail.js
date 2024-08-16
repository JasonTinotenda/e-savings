import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLoanDetails } from '../redux/actions/loanActions';

const LoanDetailComponent = ({ loanId }) => {
  const dispatch = useDispatch();
  const loanDetails = useSelector(state => state.loans.loanDetails);
  const loading = useSelector(state => state.loans.loading);
  const error = useSelector(state => state.loans.error);

  useEffect(() => {
    dispatch(fetchLoanDetails(loanId));
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
