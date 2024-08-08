import axios from 'axios';
import React, { useEffect, useState } from 'react';

const QuarterlyReport = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/reports/quarterly/', {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      setReports(response.data);
    })
    .catch(error => {
      console.error('There was an error fetching the quarterly reports!', error);
    });
  }, []);

  return (
    <div>
      <h1>Quarterly Reports</h1>
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

export default QuarterlyReport;
