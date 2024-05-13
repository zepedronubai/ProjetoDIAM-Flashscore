import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Equipa.css'
import Ligas from '../Ligas';

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
      if (userData && isAuthenticated){
        const favorito = {
          "equipa": equipaId,
          "user" : userData.user.id      
        }
        axios.post(`http://127.0.0.1:8000/favoritos/?username=${userData.user.username}`, favorito)
              .then(response => {
                window.alert('Favorito created successfully!');
              })
              .catch(error => {
                console.error('Error a dar favorito', error);
              });

      }
        console.log("oi")
    };

  return (
    <div className='container'>
      <div className='left'>
        <Ligas/>
      </div>
    <div className="main">
    {equipa && (
      <div className="team-info">
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
              <div className="jogador">
                <section className='fotoENomeJogador'>
                <img src={jogador.fotoDoJogador}/>
                <p>{jogador.nomeDoJogador}</p>
                </section>
                <section className='jogadorInfo'>
                <p>Nr: {jogador.nrDoJogador}</p>
                <p>Golos: {jogador.golos}</p>
                </section>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
  <div className='right'>
        </div>
  </div>
  
  );
}

export default Equipa;
