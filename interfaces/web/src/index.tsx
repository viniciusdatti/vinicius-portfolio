// Core
import './index.css';
import './lib/suppressThreeClockDeprecation';
import React from 'react';
import ReactDOM from 'react-dom/client';

/* *************************************************************************************************
 *********************************************** APP ***********************************************
 ************************************************************************************************ */
import App from '@/App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
