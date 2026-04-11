import React, { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import api from '../services/api';
import BookCard from '../components/BookCard';
import './Dashboard.css';

const Dashboard = ({ user }) => {
  const [books, setBooks] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBooks();
  }, [keyword]);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const url = keyword ? `/books?keyword=${keyword}` : '/books';
      const { data } = await api.get(url);
      setBooks(data);
    } catch (err) {
      setError('Failed to fetch books');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard animate-fade-in-up">
      <div className="dashboard-header glass-panel" style={{ padding: '20px', borderRadius: '16px' }}>
        <div>
          <h2>Welcome back, {user?.name}</h2>
          <p className="text-muted">Explore our digital collection.</p>
        </div>
        <div className="search-bar">
          <FiSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Search books, authors, categories..." 
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
      </div>

      {error && <div className="auth-error glass-panel">{error}</div>}

      {loading ? (
        <div className="loader"></div>
      ) : (
        <div className="books-grid">
          {books.length > 0 ? (
            books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))
          ) : (
            <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', gridColumn: '1 / -1' }}>
              <h3>No books found</h3>
              <p>Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
