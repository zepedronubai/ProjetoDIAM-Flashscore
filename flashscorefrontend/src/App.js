
import React from 'react';
import './App.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {Link} from "react-router-dom";
import Homepage from './pages/Homepage';
import Liga from './pages/Liga';
import Headerino from './pages/Headerino';
import TesteRouter from './TesteRouter';


const App = ({ children }) => {
  const pageName = children.props;
  console.log(pageName)
  return (
    <div>
      <Headerino/>
      {children}
    </div>
  );
}

export default App;
