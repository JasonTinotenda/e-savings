import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { approveLoan } from '../redux/actions/loanActions';

const ApproveLoanComponent = ({ loanId }) => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.loans.loading);
  const error = useSelector(state => state.loans.error);

  const handleApprove = () => {
    dispatch(approveLoan(loanId));
  };

  return (
    <div>
      <h2>Approve Loan</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <button onClick={handleApprove}>Approve Loan</button>
    </div>
  );
};

export default ApproveLoanComponent;
