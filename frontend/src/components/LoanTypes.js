import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchLoanTypes } from '../redux/actions/loanActions';

const LoanTypesComponent = () => {
  const dispatch = useDispatch();
  const [loanTypes, setLoanTypes] = useState([]); // Local state for loanTypes
  const [loading, setLoading] = useState(true); // Local state for loading
  const [error, setError] = useState(null); // Local state for error

  useEffect(() => {
    const loadLoanTypes = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await dispatch(fetchLoanTypes());
        setLoanTypes(result); // Assuming fetchLoanTypes returns the list of loan types
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
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
        {loanTypes.map(type => (
          <li key={type.id}>{type.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default LoanTypesComponent;
