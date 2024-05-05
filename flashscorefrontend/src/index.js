import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Pages import
import Headerino from './Headerino';
import Liga from './Liga';
import Homepage from './Homepage';
//router

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Headerino/>
    <Liga/>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
