import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiBook, FiUser, FiLogOut, FiSettings } from 'react-icons/fi';
import './Navbar.css';

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="navbar glass-panel">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          <FiBook className="logo-icon" />
          <span>NexusLib</span>
        </Link>
        
        <div className="navbar-links">
          {user ? (
            <>
              <Link to="/dashboard" className="nav-item">
                <FiUser /> Dashboard
              </Link>
              {user.role === 'admin' && (
                <Link to="/admin" className="nav-item">
                  <FiSettings /> Admin
                </Link>
              )}
              <button className="btn btn-secondary nav-btn" onClick={handleLogout}>
                <FiLogOut /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-item">Login</Link>
              <Link to="/register" className="btn btn-primary nav-btn">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
