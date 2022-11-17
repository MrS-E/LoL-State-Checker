import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {run_local} from "./other/js/stored_values";

run_local();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
