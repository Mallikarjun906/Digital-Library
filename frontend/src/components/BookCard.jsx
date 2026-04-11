import React from 'react';
import { FiDownload, FiEye } from 'react-icons/fi';

const BookCard = ({ book }) => {
  const backendUrl = "http://localhost:5000";

  return (
    <div className="book-card glass-panel">
      <img 
        src={book.coverImage ? `${backendUrl}${book.coverImage}` : `https://via.placeholder.com/300x200?text=${encodeURIComponent(book.title)}`} 
        alt={book.title} 
        className="book-cover" 
      />
      <div className="book-info">
        <div className="book-category">{book.category}</div>
        <h3 className="book-title" title={book.title}>{book.title}</h3>
        <p className="book-author">By {book.author}</p>
        <div className="book-actions">
          {book.fileUrl && (
            <a href={`${backendUrl}${book.fileUrl}`} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <FiEye /> View
            </a>
          )}
          {book.fileUrl && (
            <a href={`${backendUrl}${book.fileUrl}`} download className="btn btn-secondary">
              <FiDownload />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;
