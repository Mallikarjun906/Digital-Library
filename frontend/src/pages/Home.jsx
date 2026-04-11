import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { FiSearch, FiLayers, FiZap } from 'react-icons/fi';

const Home = () => {
  return (
    <div className="home-page animate-fade-in-up">
      <section className="hero-section">
        <div className="hero-content glass-panel">
          <h1 className="hero-title">Experience the Future of Digital Knowledge</h1>
          <p className="hero-subtitle">Access thousands of premium e-books, research papers, and documents instantly with our next-generation digital library management system.</p>
          <div className="hero-actions">
            <Link to="/register" className="btn btn-primary btn-lg">Get Started</Link>
            <Link to="/login" className="btn btn-secondary btn-lg">Browse Catalog</Link>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="feature-card glass-panel">
          <div className="feature-icon"><FiSearch /></div>
          <h3>Advanced Search</h3>
          <p>Find exactly what you need with our lightning-fast, full-text indexed search engine across all categories.</p>
        </div>
        <div className="feature-card glass-panel">
          <div className="feature-icon"><FiLayers /></div>
          <h3>Organized Collections</h3>
          <p>Curated categories and personalized recommendations based on your reading history and preferences.</p>
        </div>
        <div className="feature-card glass-panel">
          <div className="feature-icon"><FiZap /></div>
          <h3>Instant Access</h3>
          <p>Read online or download PDFs instantly with zero wait times. Your books, always available on any device.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
