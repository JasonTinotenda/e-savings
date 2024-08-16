import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLoanTypes } from '../redux/loanSlice'; // Import the thunk from loanSlice

const LoanTypesComponent = () => {
  const dispatch = useDispatch();
  const { loanTypes, loading, error } = useSelector((state) => state.loan);

  useEffect(() => {
    const loadLoanTypes = async () => {
      try {
        await dispatch(fetchLoanTypes()).unwrap(); // Dispatch the fetchLoanTypes action and unwrap the result
      } catch (err) {
        console.error('Failed to fetch loan types:', err.message); // Log error
      }
    };

    loadLoanTypes();
  }, [dispatch]);

  return (
    <div>
      <h2>Loan Types</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {loanTypes.map((type) => (
          <li key={type.id}>{type.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default LoanTypesComponent;
