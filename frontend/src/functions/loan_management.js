import axios from 'axios';
import React, { useEffect, useState } from 'react';

const LoanApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/loans/application/', {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      setApplications(response.data);
    })
    .catch(error => {
      console.error('There was an error fetching the loan applications!', error);
    });
  }, []);

  return (
    <div>
      <h1>Loan Applications</h1>
      <ul>
        {applications.map(app => (
          <li key={app.id}>{app.amount} - {app.status}</li>
        ))}
      </ul>
    </div>
  );
};

export default LoanApplications;
