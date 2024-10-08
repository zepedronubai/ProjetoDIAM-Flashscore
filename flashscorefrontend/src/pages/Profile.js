import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css'

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
    return <section>Loading...</section>;
  }

  return (
    <section className="userDataContainer">
    <h1 className="userDataTitle">User Information</h1>
    <section className="userData">
        <section className="userDataItem">
            <span className="userDataLabel">Username:</span>
            <span className="userDataValue">{userData.user.username}</span>
        </section>
        <section className="userDataItem">
            <span className="userDataLabel">Email:</span>
            <span className="userDataValue">{userData.user.email}</span>
        </section>
        {/* Add more user information items as needed */}
    </section>
</section>
  );
}

export default Profile;
