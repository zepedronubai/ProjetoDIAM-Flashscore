import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FormsToCreateObjects.css'




function LigaCreate({ onUpdateMainSection }){
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
      axios.post('http://127.0.0.1:8000/ligas', formData)
        .then(response => {
          onUpdateMainSection("Ligas");
        })
        .catch(error => {
          console.error('Error creating Liga object:', error);
        });
    };
  
    return (
      <div className='allStuffFormsToCreate'>
        <h2>Create Liga</h2>
        <form onSubmit={handleFormSubmit}>
            <input type="text" placeholder='Nome' value={nomeDaLiga} onChange={(e) => setNomeDaLiga(e.target.value)} required />
            <p>
              Nr máx de equipas:
            </p>
            <input type="number" placeholder='Nr max equipas' value={nrMaxEquipasDaLiga} onChange={(e) => setNrMaxEquipasDaLiga(e.target.value)} />
            <input type="text" value={logoDaLiga} onChange={(e) => setLogoDaLiga(e.target.value)} placeholder='Logo' />
          <button type="submit">Create Liga</button>
        </form>
      </div>
    );
  }
  
  function EquipaCreate({ onUpdateMainSection }){
    const [nomeDaEquipa, setNomeDaEquipa] = useState('');
    const [sigla, setSigla] = useState('');
    const [ligaId, setLigaId] = useState(''); // Assuming you'll select Liga from a dropdown
    const [ligas, setLigas] = useState([]);
    const [logoDaEquipa, setLogoDaEquipa] = useState('');
  

    useEffect(() => {
      // Fetch Ligas from the backend API
      axios.get('http://127.0.0.1:8000/ligas')
        .then(response => {
          setLigas(response.data);
        })
        .catch(error => {
          console.error('Error fetching Ligas:', error);
        });
    }, []);
  

    const handleFormSubmit = (event) => {
      event.preventDefault();
      const formData = {
        nomeDaEquipa: nomeDaEquipa,
        sigla: sigla,
        liga: ligaId,
        logoDaEquipa: logoDaEquipa,
      };
      axios.post('http://127.0.0.1:8000/equipas', formData)
        .then(response => {
            window.alert('Equipa created successfully!');
            onUpdateMainSection("Equipas");
          // Handle successful creation of Equipa object
          // Update main section with the newly created Equipa object
        })
        .catch(error => {
          console.error('Error creating Equipa object:', error);
        });
    };
  
    return (
      <div className='allStuffFormsToCreate'>
        <h2>Create Equipa</h2>
        <form className='formsForm' onSubmit={handleFormSubmit}>
         
            <input type="text" placeholder='Nome da Equipa' value={nomeDaEquipa} onChange={(e) => setNomeDaEquipa(e.target.value)} />
            <input type="text" placeholder='Sigla' value={sigla} onChange={(e) => setSigla(e.target.value)} />
            <p>Liga</p>
            <select value={ligaId} onChange={(e) => setLigaId(e.target.value)}>
              <option value="">Select Liga</option>
              {ligas.map(liga => (
                <option key={liga.id} value={liga.id}>{liga.nomeDaLiga}</option>
              ))}
            </select>
            <input type="text" placeholder='Logo Da Equipa' value={logoDaEquipa} onChange={(e) => setLogoDaEquipa(e.target.value)} />
          <button type="submit">Create Equipa</button>
        </form>
      </div>
    );
  }
  
  function JogadorCreate({ onUpdateMainSection }) {
    const [nomeDoJogador, setNomeDoJogador] = useState('');
    const [nrDoJogador, setNrDoJogador] = useState('');
    const [dataDeNascimento, setDataDeNascimento] = useState('');
    const [nacionalidadedoJogador, setNacionalidadedoJogador] = useState('');
    const [equipaDoJogador, setEquipaDoJogador] = useState('');
    const [equipas, setEquipas] = useState([]);
    const [nacionalidades, setNacionalidades] = useState([]);
    const [fotoDoJogador, setFotoDoJogador] = useState('');

    useEffect(() => {
      // Fetch Equipas from the backend API
      axios.get('http://127.0.0.1:8000/equipas')
        .then(response => {
          setEquipas(response.data);
        })
        .catch(error => {
          console.error('Error fetching Equipas:', error);
        });
    }, []);
  
    useEffect(() => {
      // Fetch Equipas from the backend API
      axios.get('http://127.0.0.1:8000/nacionalidades')
        .then(response => {
          setNacionalidades(response.data);
        })
        .catch(error => {
          console.error('Error fetching Equipas:', error);
        });
    }, []);

    const handleFormSubmit = (event) => {
      event.preventDefault();
      console.log(nomeDoJogador)
      console.log(nrDoJogador)
      console.log(dataDeNascimento)
      console.log(nacionalidadedoJogador)
      console.log(equipaDoJogador)
      console.log(fotoDoJogador)
      const formData = {
        nomeDoJogador: nomeDoJogador,
        nrDoJogador: nrDoJogador,
        dataDeNascimento: dataDeNascimento,
        nacionalidadedoJogador: nacionalidadedoJogador,
        equipaDoJogador: equipaDoJogador,
        fotoDoJogador: fotoDoJogador,
      };
      axios.post('http://127.0.0.1:8000/jogadores', formData)
        .then(response => {
          window.alert('Jogador created successfully!');
          onUpdateMainSection("Jogadores");
        })
        .catch(error => {
          console.error('Error creating Jogador object:', error);
        });
    };
  
    return (
      <div className='allStuffFormsToCreate'>
        <h2>Create Jogador</h2>
        <form onSubmit={handleFormSubmit}>
          <input type="text" placeholder='Nome do Jogador' value={nomeDoJogador} onChange={(e) => setNomeDoJogador(e.target.value)} />
          <input type="number" placeholder='Número do Jogador' value={nrDoJogador} onChange={(e) => setNrDoJogador(e.target.value)} />
          <input type="datetime-local" placeholder='Data de Nascimento' value={dataDeNascimento} onChange={(e) => setDataDeNascimento(e.target.value)} />
          {/* Assume you have a dropdown component for selecting Nacionalidade */}
          <select value={nacionalidadedoJogador} onChange={(e) => setNacionalidadedoJogador(e.target.value)}>
            <option value="">Nacionalidade</option>
            {nacionalidades.map(nacionalidade => (
              <option key={nacionalidade.id} value={nacionalidade.id}>{nacionalidade.nacionalidadeNome}</option>
            ))}
          </select>
          <select value={equipaDoJogador} onChange={(e) => setEquipaDoJogador(e.target.value)}>
            <option value="">Select Equipa</option>
            {equipas.map(equipa => (
              <option key={equipa.id} value={equipa.id}>{equipa.nomeDaEquipa}</option>
            ))}
          </select>
          <input type="text" placeholder='Foto do Jogador' value={fotoDoJogador} onChange={(e) => setFotoDoJogador(e.target.value)} />
          <button type="submit">Create Jogador</button>
        </form>
      </div>
    );
  }
  

  function JogoCreate({ onUpdateMainSection }) {
    const [equipaDaCasa, setEquipaDaCasa] = useState('');
    const [equipaDeFora, setEquipaDeFora] = useState('');
    const [liga, setLiga] = useState('');
    const [ligas, setLigas] = useState([]);
    const [equipas, setEquipas] = useState([]);
    const [horaDoJogo, setHoraDoJogo] = useState('');
  
    useEffect(() => {
      // Fetch Ligas from the backend API
      axios.get('http://127.0.0.1:8000/ligas')
        .then(response => {
          setLigas(response.data);
        })
        .catch(error => {
          console.error('Error fetching Ligas:', error);
        });
    }, []);
  
    useEffect(() => {
      // Fetch Equipas based on selected Liga from the backend API
      if (liga) {
        axios.get(`http://127.0.0.1:8000/liga/${liga}`)
          .then(response => {
            setEquipas(response.data.equipas);
          })
          .catch(error => {
            console.error('Error fetching Equipas:', error);
          });
      }
    }, [liga]);
  
    const handleFormSubmit = (event) => {
      event.preventDefault();
      console.log(equipaDaCasa)
      console.log(equipaDeFora)
      let equipaDaCasaObject = equipas.find(equipa => equipa.id === parseInt(equipaDaCasa));
      let equipaDeForaObject = equipas.find(equipa => equipa.id === parseInt(equipaDeFora));
      console.log(equipaDaCasa)
      console.log(equipaDeFora)
      const formData = {
        equipaDaCasa: equipaDaCasa,
        equipaDeFora: equipaDeFora,
        liga: liga,
        horaDoJogo: horaDoJogo,
      };
      axios.post('http://127.0.0.1:8000/jogos', formData)
        .then(response => {
          window.alert('Jogo created successfully!');
          onUpdateMainSection("Jogos");
        })
        .catch(error => {
          console.error('Error creating Jogo object:', error.response.data);
        });
    };
  
    return (
      <div className='allStuffFormsToCreate'>
        <h2>Create Jogo</h2>
        <form onSubmit={handleFormSubmit}>
          <select value={liga} onChange={(e) => setLiga(e.target.value)}>
            <option value="">Liga</option>
            {ligas.map(liga => (
              <option key={liga.id} value={liga.id}>{liga.nomeDaLiga}</option>
            ))}
          </select>
          <select value={equipaDaCasa} onChange={(e) => setEquipaDaCasa(e.target.value)}>
            <option value="">Equipa da Casa</option>
            {equipas.map(equipa => (
              <option key={equipa.id} value={equipa.id}>{equipa.nomeDaEquipa}</option>
            ))}
          </select>
          <select value={equipaDeFora} onChange={(e) => setEquipaDeFora(e.target.value)}>
            <option value="">Equipa de fora</option>
            {equipas.map(equipa => (
              <option key={equipa.id} value={equipa.id}>{equipa.nomeDaEquipa}</option>
            ))}
          </select>
          <p>Data do jogo</p>
          <input type="datetime-local" placeholder='Hora do Jogo' value={horaDoJogo} onChange={(e) => setHoraDoJogo(e.target.value)} />
          <button type="submit">Create Jogo</button>
        </form>
      </div>
    );
  }

  export {LigaCreate,EquipaCreate,JogadorCreate,JogoCreate};
  