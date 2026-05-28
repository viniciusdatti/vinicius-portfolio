// Core
import React from 'react';

// Libraries
import ReactDOM from 'react-dom/client';

// Component
import './index.css';
import './lib/suppressThreeClockDeprecation';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
