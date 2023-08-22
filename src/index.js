import React from 'react';
import ReactDOM from 'react-dom/client';
import './Assets/scss/index.scss';
import { DataContextProvider } from './Context/dataContext';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DataContextProvider>
      <App />
    </DataContextProvider>
  </React.StrictMode>
);

reportWebVitals();
