import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Equipa.css'
import Ligas from './Ligas';

function Equipa() {
    const [equipa, setEquipa] = useState(null);
    const equipaIdObject = useParams();
    const equipaId = equipaIdObject.equipaID

    useEffect(() => {
    axios.get(`http://127.0.0.1:8000/equipa/${equipaId}`)
    .then(res => { 
        setEquipa(res.data);
        
    });
    }, [equipaId]);

    const [userData, setUserData] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
  
      
      useEffect(() => {
          checkAuthentication();
      },[isAuthenticated]);
      
             const checkAuthentication = async () => {
            try {
      
      
              if(localStorage.getItem('token') !== null){
                  setIsAuthenticated(true);
                  axios.get(`http://127.0.0.1:8000/profile/${localStorage.getItem('username')}`)
                  .then(response => {
                    setUserData(response.data);
                    console.log("guardado")
                    console.log(response.data)
                  })
                  .catch(error => {
                    console.error('Error fetching user data:', error);
                  });
              }else{
                  setIsAuthenticated(false);
              }
      
            } catch (error) {
              console.error('Error checking authentication:', error);
      
            }
          };



          const darFavorito = () => {
            if (userData && isAuthenticated) {
              const favorito = {
                "equipa": equipaId,
                "user": userData.user.id
              };
          
              // Fetch the user's favorites
              axios.get('http://127.0.0.1:8000/favoritos/', {
                params: {
                  username: userData.user.username
                }
              })
                .then(response => {
                  const equipas = response.data.equipas;
                  console.log(equipaId)
                  console.log(equipas)
                  // Check if the equipaId already exists in the user's favorites
                  const isFavoritoExist = equipas.some(equipa => equipa.id == equipaId);
                  console.log(isFavoritoExist)
                  if (isFavoritoExist) {
                    window.alert('Esta equipa já pertence aos favoritos');
                  } else {
                    // If the equipaId doesn't exist, add it to the favorites
                    axios.post(`http://127.0.0.1:8000/favoritos/?username=${userData.user.username}`, favorito)
                      .then(response => {
                        window.alert('Equipa adicionada aos favoritos');
                      })
                      .catch(error => {
                        console.error('Error a dar favorito', error);
                      });
                  }
                })
                .catch(error => {
                  console.error('Error ao dar fetch aos favoritos:', error);
                });
            }
            console.log("oi");
          };
          

  return (
    <section className='container'>
      <section className='left'>
        <Ligas/>
      </section>
    <section className="main">
    {equipa && (
      <section className="team-info">
        <section className='fotoENome'>
          <img src='{equipa.equipa}'></img>
          <h2>{equipa.equipa.nomeDaEquipa}</h2>
          <a href onClick={darFavorito}><i className="far fa-star"/></a>
        </section>
        <section className='equipaInfo'>
          <p>Sigla: {equipa.equipa.sigla}</p>
          <p>Pontos: {equipa.equipa.pontos}</p>
          <p>Golos: {equipa.equipa.golos}</p>
        </section>
        <h3 className='jogadoresTitulo'>Plantel:</h3>
        <ul className="jogadores">
          {equipa.jogadores.map((jogador) => (
            <li key={jogador.id} className="">
              <section className="jogador">
                <section className='fotoENomeJogador'>
                <img src={jogador.fotoDoJogador}/>
                <p>{jogador.nomeDoJogador}</p>
                </section>
                <section className='jogadorInfo'>
                <p>Nr: {jogador.nrDoJogador}</p>
                <p>Golos: {jogador.golos}</p>
                </section>
              </section>
            </li>
          ))}
        </ul>
      </section>
    )}
  </section>
  <section className='right'>
        </section>
  </section>
  
  );
}

export default Equipa;
