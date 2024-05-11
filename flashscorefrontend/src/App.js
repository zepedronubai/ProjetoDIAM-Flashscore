
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

// export default function App() {
//   return (
//     <Router>
//       <Routes>
//       <Route exact path="/" component={TesteRouter} />
//         <Route path="/ligas" component={Liga} />
//       </Routes>
//     </Router>
//   );
// }

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Homepage />} />
//         <Route path="ligas" element={<Liga />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;