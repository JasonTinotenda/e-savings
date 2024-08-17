import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AuditLogs = ({ personId }) => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get(`/api/persons/${personId}/logs/`);
        setLogs(response.data);
      } catch (error) {
        console.error('Failed to fetch audit logs:', error);
      }
    };
    fetchLogs();
  }, [personId]);

  return (
    <div>
      <h3>Audit Logs</h3>
      <ul>
        {logs.map(log => (
          <li key={log.id}>
            {log.timestamp}: {log.action} by {log.user}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuditLogs;
