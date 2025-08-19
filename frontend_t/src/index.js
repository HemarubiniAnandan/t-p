import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app'; // lowercase to match app.js exactly
import './styles/styles.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
