import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Favoritos.css'
import { Link } from 'react-router-dom';

function Profile() {
  const [userData, setUserData] = useState(null);
  const [favoritos, setFavoritos] = useState(null);
  const [equipas, setEquipas] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

    
    const getEquipaName = (equipaId) => {
      const equipa = equipas.find(equipa => equipa.id === equipaId);
      return equipa ? equipa : 'Unknown';
    };

    useEffect(() => {
        checkAuthentication();
    },[isAuthenticated]);
    
    useEffect(() => {
        if (userData) {
          // Perform another Axios GET request when userData is updated
          axios.get('http://127.0.0.1:8000/favoritos/', {
            params: {
                username: userData.user.username
              }
            })
            .then(response => {
              setFavoritos(response.data.favoritos)
              setEquipas(response.data.equipas)
              console.log('Additional data fetched:', response.data);
            })
            .catch(error => {
              console.error('Error ao dar fetch aos favoritos:', error);
            });
        }
      }, [userData]);


           const checkAuthentication = async () => {
          try {
    
    
            if(localStorage.getItem('token') !== null){
                setIsAuthenticated(true);
                console.log("tamos logados")
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

        const removerFavorito = (favoritoId) => {
            axios.delete('http://127.0.0.1:8000/favoritos/', {
            data: {
                username: userData.user.username,
                favoritoId: favoritoId
            }
            })
            .then(response => {
                if (response.status === 204) {
                    // Handle the 204 response status
                    console.log('Favorito deleted successfully');
                    setFavoritos(prevFavoritos => prevFavoritos.filter(favorito => favorito.id !== favoritoId));
                } else {
                    // Handle other response statuses if necessary
                    console.log('Unexpected response status:', response.status);
            }
            })
            .catch(error => {
            console.error('Error deleting Favorito:', error);
            });
          };
          


  if (!userData || !isAuthenticated) {
    // If user data is not yet fetched, display loading or login prompt
    return <section>Loading...</section>;
  }

  return (
    <>

    <section className="main">
        <h2 className='favoritosNome'>Favoritos</h2>
        {favoritos ? (
            <section className='favoritos'>
              <ul>
                {favoritos.map(favorito => (
                  <li key={favorito.id}>
                    <Link to={`/Equipa/${getEquipaName(favorito.equipa).id}`} className='nomeEquipa'><h2>{getEquipaName(favorito.equipa).nomeDaEquipa}</h2></Link>
                    <href className="removeButton" onClick={() => removerFavorito(favorito.id)}>
                          <i className="far fa-star"/>
                    </href>
                  </li>
                ))}
              </ul>
            </section>
        ) : (
            <p>Loading favoritos...</p>
        )}
    </section>
</>

  );
}

export default Profile;
