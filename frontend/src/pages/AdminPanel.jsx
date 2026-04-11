import React, { useState, useEffect } from 'react';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import api from '../services/api';

const AdminPanel = () => {
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState({ title: '', author: '', category: '', description: '' });
  const [file, setFile] = useState(null);
  const [cover, setCover] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const { data } = await api.get('/books');
      setBooks(data);
    } catch (err) {
      console.error(err);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('author', formData.author);
    data.append('category', formData.category);
    data.append('description', formData.description);
    if (file) data.append('file', file);
    if (cover) data.append('cover', cover);

    try {
      setLoading(true);
      await api.post('/books', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMessage('Book added successfully!');
      setFormData({ title: '', author: '', category: '', description: '' });
      setFile(null);
      setCover(null);
      fetchBooks();
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error adding book');
    } finally {
      setLoading(false);
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await api.delete(`/books/${id}`);
        fetchBooks();
      } catch (err) {
        alert(err.response?.data?.message || 'Error deleting book');
      }
    }
  };

  return (
    <div className="admin-panel animate-fade-in-up">
      <h2 style={{ marginBottom: '20px' }}>Admin Dashboard</h2>
      
      <div className="admin-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px' }}>
        {/* Add Book Form */}
        <div className="add-book-section glass-panel" style={{ padding: '30px' }}>
          <h3>Add New Book</h3>
          {message && <div style={{ padding: '10px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', borderRadius: '8px', marginBottom: '15px' }}>{message}</div>}
          
          <form onSubmit={submitHandler} className="auth-form mt-4">
            <div className="form-group">
              <label>Title</label>
              <input type="text" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Author</label>
              <input type="text" required value={formData.author} onChange={(e) => setFormData({...formData, author: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Category</label>
              <input type="text" required value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea required rows="3" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Book PDF</label>
              <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setFile(e.target.files[0])} style={{ padding: '8px' }} />
            </div>
            <div className="form-group">
              <label>Cover Image</label>
              <input type="file" accept="image/*" onChange={(e) => setCover(e.target.files[0])} style={{ padding: '8px' }} />
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Adding...' : <><FiPlus /> Add Book</>}
            </button>
          </form>
        </div>

        {/* Manage Books */}
        <div className="manage-books-section glass-panel" style={{ padding: '30px' }}>
          <h3>Manage Library</h3>
          <div className="books-list mt-4" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {books.map((book) => (
              <div key={book._id} className="glass-panel" style={{ padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.05)' }}>
                <div>
                  <h4 style={{ margin: '0 0 5px 0' }}>{book.title}</h4>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{book.author} | {book.category}</span>
                </div>
                <button onClick={() => deleteHandler(book._id)} className="btn btn-danger" style={{ padding: '8px' }}>
                  <FiTrash2 />
                </button>
              </div>
            ))}
            {books.length === 0 && <p>No books in library.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
