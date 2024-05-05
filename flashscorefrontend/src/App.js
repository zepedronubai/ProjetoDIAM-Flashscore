
import React from 'react';
import './App.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from './Homepage';
import Liga from './Liga';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Liga />}>
        <Route path="Liga" element={<Liga />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

