import axios from 'axios';
import React, { useState } from 'react';

const RegisterMember = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/members/register/', {
      username: username,
      password: password,
      email: email,
    })
    .then(response => {
      console.log('Member registration successful:', response.data);
      setUsername('');
      setPassword('');
      setEmail('');
    })
    .catch(error => {
      console.error('There was an error registering the member!', error);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterMember;
