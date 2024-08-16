import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLoanTypes } from '../redux/actions/loanActions';

const LoanTypesComponent = () => {
  const dispatch = useDispatch();
  const loanTypes = useSelector(state => state.loans.loanTypes);
  const loading = useSelector(state => state.loans.loading);
  const error = useSelector(state => state.loans.error);

  useEffect(() => {
    dispatch(fetchLoanTypes());
  }, [dispatch]);

  return (
    <div>
      <h2>Loan Types</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {loanTypes.map(type => (
          <li key={type.id}>{type.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default LoanTypesComponent;
