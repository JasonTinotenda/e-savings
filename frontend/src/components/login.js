import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/auth/login/', {
      username: username,
      password: password
    })
    .then(response => {
      localStorage.setItem('token', response.data.token);
      history.push('/transactions');  // Redirect to transactions page
    })
    .catch(error => {
      console.error('There was an error logging in!', error);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
