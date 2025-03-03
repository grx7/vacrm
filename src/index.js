import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// 1) Import the provider from DataContext
import { DataProvider } from './DataContext';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    {/* 2) Wrap the entire App in DataProvider */}
    <DataProvider>
      <App />
    </DataProvider>
  </React.StrictMode>
);
