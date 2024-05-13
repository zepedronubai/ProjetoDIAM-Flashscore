import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Favoritos.css'

function Profile() {
  const [userData, setUserData] = useState(null);
  const [favoritos, setFavoritos] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

    
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
              setFavoritos(response.data)
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
                    // Update your state or perform any other actions as needed
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
    return <div>Loading...</div>;
  }

  return (
    <>
    <div className="leftSection">
        <h2>Username: {userData.user.username}</h2>
        <h2>ID: {userData.user.id}</h2>
        <h2>Email: {userData.user.email}</h2>
    </div>

    <div className="rightSection">
        {favoritos ? (
            <div>
                {favoritos.map(favorito => (
                    <div className="ligaContainer" key={favorito.id}>
                        <h3>Equipa: {favorito.nomeDaEquipa}</h3>
                        <button className="removeButton" onClick={() => removerFavorito(favorito.id)}>
                            <i className="far fa-star"/>
                        </button>
                    </div>
                ))}
            </div>
        ) : (
            <p>Loading favoritos...</p>
        )}
    </div>
</>

  );
}

export default Profile;
