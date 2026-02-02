import React from 'react';
import './LoadingStates.css';

export const Loading = () => (
  <div className="loading">
    <div className="spinner"></div>
    Loading...
  </div>
);

export const EmptyState = ({ icon = '📭', message = 'No data available' }) => (
  <div className="empty-state">
    <div className="empty-state-icon">{icon}</div>
    <p>{message}</p>
  </div>
);

export const ErrorMessage = ({ message, onClose }) => (
  <div className="error">
    <span>⚠️ {message}</span>
    {onClose && <button onClick={onClose}>✕</button>}
  </div>
);
