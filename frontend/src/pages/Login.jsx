import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import './Auth.css';

const Login = ({ setUser }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const submitHandler = async (e) => {
    e.preventDefault();

    // --- DUMMY MOCK LOGIN (REMOVE WHEN CONNECTED TO DB) ---
    if (formData.email === 'admin@test.com' || formData.email === 'user@test.com') {
      const mockUser = {
        _id: 'mock-12345',
        name: formData.email === 'admin@test.com' ? 'Dummy Admin' : 'Dummy User',
        email: formData.email,
        role: formData.email === 'admin@test.com' ? 'admin' : 'user',
        token: 'mock-jwt-token'
      };
      localStorage.setItem('userInfo', JSON.stringify(mockUser));
      setUser(mockUser);
      navigate('/dashboard');
      return;
    }
    // --------------------------------------------------------

    try {
      setLoading(true);
      setError('');
      const { data } = await api.post('/auth/login', formData);
      localStorage.setItem('userInfo', JSON.stringify(data));
      setUser(data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container animate-fade-in-up">
      <div className="auth-card glass-panel">
        <h2>Welcome Back</h2>
        {error && <div className="auth-error glass-panel">{error}</div>}
        <form onSubmit={submitHandler} className="auth-form">
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" name="email" required value={formData.email} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" required value={formData.password} onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="auth-redirect">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
