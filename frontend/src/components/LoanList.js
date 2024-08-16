import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLoans } from '../redux/actions/loanActions';

const LoanListComponent = () => {
  const dispatch = useDispatch();
  const loans = useSelector(state => state.loans.loans);
  const loading = useSelector(state => state.loans.loading);
  const error = useSelector(state => state.loans.error);

  useEffect(() => {
    dispatch(fetchLoans());
  }, [dispatch]);

  return (
    <div>
      <h2>Loans</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {loans.map(loan => (
          <li key={loan.id}>{loan.amount} - {loan.status}</li>
        ))}
      </ul>
    </div>
  );
};

export default LoanListComponent;
