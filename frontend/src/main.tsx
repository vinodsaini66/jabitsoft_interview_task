import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import App from './App.js';
import './index.css';


// ✅ Optional: Type safety for the root element
const rootElement = document.getElementById('root');

if (rootElement) {
  const root = createRoot(rootElement); // 👈 No need to cast, TypeScript infers it
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
} else {
  throw new Error('Root element not found');
}
