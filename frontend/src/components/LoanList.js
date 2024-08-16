import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchLoans } from '../redux/actions/loanActions';

const LoanListComponent = () => {
  const dispatch = useDispatch();
  const [loans, setLoans] = useState([]); // Local state for loans
  const [loading, setLoading] = useState(true); // Local state for loading
  const [error, setError] = useState(null); // Local state for error

  useEffect(() => {
    const loadLoans = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await dispatch(fetchLoans());
        setLoans(result); // Assuming fetchLoans returns the list of loans
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
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
        {loans.map(loan => (
          <li key={loan.id}>{loan.amount} - {loan.status}</li>
        ))}
      </ul>
    </div>
  );
};

export default LoanListComponent;
