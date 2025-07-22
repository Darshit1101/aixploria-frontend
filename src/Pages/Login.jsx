// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('secure@123');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password,
      });

      localStorage.setItem('admin', JSON.stringify(res.data.user));
      navigate('/dashboard/users');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="login mt-100">
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input type="text" onChange={e => setUsername(e.target.value)} placeholder="Username" required />
        <input type="password"  onChange={e => setPassword(e.target.value)} placeholder="Password" required />
        <button type="submit">Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
