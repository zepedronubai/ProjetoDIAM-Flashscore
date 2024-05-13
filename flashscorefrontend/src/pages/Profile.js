import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Profile() {
  const [userData, setUserData] = useState(null);
  const [username, setUsername] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

    
    useEffect(() => {
        checkAuthentication();
    },[isAuthenticated,username]);
    
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


  if (!userData || !isAuthenticated) {
    // If user data is not yet fetched, display loading or login prompt
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Username: {userData.user.username}</h1>
      <h1>Email: {userData.user.email}</h1>
      {/* <p>Email: {userData.email}</p> */}
      {/* Display other user information as needed */}
    </div>
  );
}

export default Profile;
