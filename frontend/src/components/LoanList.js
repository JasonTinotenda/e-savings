import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLoans } from '../redux/loanSlice'; // Import the thunk from loanSlice

const LoanListComponent = () => {
  const dispatch = useDispatch();
  const { loans, loading, error } = useSelector((state) => state.loan);

  useEffect(() => {
    const loadLoans = async () => {
      try {
        await dispatch(fetchLoans()).unwrap(); // Dispatch the fetchLoans action and unwrap the result
      } catch (err) {
        console.error('Failed to fetch loans:', err.message); // Log error
      }
    };

    loadLoans();
  }, [dispatch]);

  return (
    <div>
      <h2>Loans</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {loans.map((loan) => (
          <li key={loan.id}>{loan.amount} - {loan.status}</li>
        ))}
      </ul>
    </div>
  );
};

export default LoanListComponent;
