import React from 'react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Pages import
import Headerino from './pages/Headerino';
import Liga from './pages/Liga';
import Homepage from './pages/Homepage';
import TesteRouter from './TesteRouter';
import Login from './pages/Login';
import Jogador from './pages/Jogador';
import Favoritos from './pages/Favoritos';
// import Admin from './Admin'
import AdminTwo from './pages/AdminTwo';
import FormsToCreateTry from './javenhoaqui/FormsToCreateTry';
import Equipa from './pages/Equipa';
//router
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import {Link} from "react-router-dom";
//icons import 
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Profile from './pages/Profile';

library.add(faTrashAlt);


const rootElement = document.getElementById('root');

// ReactDOM.createRoot(rootElement).render(<App />);

ReactDOM.createRoot(rootElement).render(
  <Router>
    <App>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/Liga/:ligaId" element={<Liga />} />
        <Route exact path="/Admin" element={<AdminTwo />} />
        <Route exact path="/Equipa/:equipaID" element={<Equipa />} />
        <Route exact path="/Login" element={<Login />} />
        <Route exact path="/Jogador/:jogadorID" element={<Jogador />} />
        <Route exact path="/Favoritos" element={<Favoritos />} />
        <Route exact path="/Profile" element={<Profile />} />
      </Routes>
    </App>
  </Router>
);

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// root.render(
//   <>
//     <App/>
//   </>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
