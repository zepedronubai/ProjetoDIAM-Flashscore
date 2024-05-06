import React, { useState } from 'react';
import axios from 'axios';


function LigaCreate(){
    const [nomeDaLiga, setNomeDaLiga] = useState('');
    const [nrMaxEquipasDaLiga, setNrMaxEquipasDaLiga] = useState(10);
    const [logoDaLiga, setLogoDaLiga] = useState('');
  
    const handleFormSubmit = (event) => {
      event.preventDefault();
      const formData = {
        nomeDaLiga: nomeDaLiga,
        nrMaxEquipasDaLiga: nrMaxEquipasDaLiga,
        logoDaLiga: logoDaLiga
      };
      axios.post('http://127.0.0.1:8000/ligas/', formData)
        .then(response => {
          // Handle successful creation of Liga object
          // Update main section with the newly created Liga object
        })
        .catch(error => {
          console.error('Error creating Liga object:', error);
        });
    };
  
    return (
      <div>
        <h2>Create Liga</h2>
        <form onSubmit={handleFormSubmit}>
          <label>
            Nome da Liga:
            <input type="text" value={nomeDaLiga} onChange={(e) => setNomeDaLiga(e.target.value)} />
          </label>
          <label>
            Nr. Max Equipas da Liga:
            <input type="number" value={nrMaxEquipasDaLiga} onChange={(e) => setNrMaxEquipasDaLiga(e.target.value)} />
          </label>
          <label>
            Logo da Liga:
            <input type="text" value={logoDaLiga} onChange={(e) => setLogoDaLiga(e.target.value)} />
          </label>
          <button type="submit">Create Liga</button>
        </form>
      </div>
    );
  }
  
  export default LigaCreate;
  