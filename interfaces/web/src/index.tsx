// Core
import React from 'react';

// Libraries
import ReactDOM from 'react-dom/client';

// Lib
import { deferThreeConsolePatch } from './lib/three';

// Components
import './index.css';
import { App } from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

deferThreeConsolePatch();
