import axios from 'axios';
import React, { useEffect, useState } from 'react';

const AnnualReport = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/reports/annual/', {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      setReports(response.data);
    })
    .catch(error => {
      console.error('There was an error fetching the annual reports!', error);
    });
  }, []);

  return (
    <div>
      <h1>Annual Reports</h1>
      <ul>
        {reports.map(report => (
          <li key={report.id}>
            <pre>{JSON.stringify(report.data, null, 2)}</pre>
            <p>Date Created: {new Date(report.date_created).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnnualReport;
