import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Jogador.css';
import Ligas from './Ligas';

function Jogador() {
  const [jogador, setJogador] = useState(null);
  const { jogadorID } = useParams();

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/jogador/${jogadorID}`)
      .then(res => { 
        setJogador(res.data);
        console.log(jogador);
      })
      .catch(error => {
        console.error('Error fetching jogador:', error);
      });
  }, [jogadorID]);

  const formatDataDeNascimento = (dateString) => {
    const dateObject = new Date(dateString);
    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1; // Months are zero-indexed, so add 1
    const year = dateObject.getFullYear();
    return `${day}/${month}/${year}`;
  };

  if (!jogador) {
    return <div>Loading...</div>;
  }

  return (
    <section className='container'>
        <section className='left'>
            <Ligas/>
        </section>
        <section className='main'>
            <section className='fotoENomeJogadorProfile'>
                    <img src='#'></img>
                    <h2>{jogador.jogador.nomeDoJogador}</h2>
            </section>
                <p>Número: {jogador.jogador.nrDoJogador}</p>

                <p>Data de Nascimento:  {formatDataDeNascimento(jogador.jogador.dataDeNascimento)}</p>
                <p>Nacionalidade: {jogador.nacionalidade.nacionalidadeNome}</p>
        </section>
        <section>

        </section>

    </section>    
   
        
  );
}

export default Jogador;
