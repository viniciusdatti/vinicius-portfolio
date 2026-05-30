// Core
import React from 'react';

// Libraries
import ReactDOM from 'react-dom/client';

// Components
import './index.css';
import { App } from './App';

// Lib
import './lib/three';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
