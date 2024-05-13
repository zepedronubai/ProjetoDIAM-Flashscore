import './Headerino.css';
import { useState , useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import Login, {username} from './Login'


function Headerino(){

    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showRegisterForm, setShowRegisterForm] = useState(false);
    const [showPagina, setShowPagina] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState(null);
    const [userData, setUserData] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const toggleLoginForm = () => {
        setShowLoginForm(!showLoginForm);
        setShowRegisterForm(false);
    };

    const toggleRegisterForm = () => {
        setShowRegisterForm(!showRegisterForm);
        setShowLoginForm(false);
    };

    window.addEventListener('storage', () => {
    console.log("Change to local storage!");
    setUsername(localStorage.getItem('username'));
    })

    useEffect(() => {
        checkAuthentication();
    },[isAuthenticated,username]);

       const checkAuthentication = async () => {
      try {


        if(localStorage.getItem('token') !== null){
            setIsAuthenticated(true);

        }else{
            setIsAuthenticated(false);
        }

      } catch (error) {
        console.error('Error checking authentication:', error);

      }
    };



    const handleLogout = async (e) => {

        try {
            const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
            console.log(token);
            const response = await axios.post('http://127.0.0.1:8000/logout/', {token}, {

        });
            console.log('Logout successful:', response.data);
            setIsLoggedIn(false);
            setUsername(null);
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            setIsAuthenticated(false);
            alert("Logout efetuado com sucesso!")
            window.location.href = '/Login';
        } catch (error) {
            console.error('Logout error:', error);
            // Handle logout error, if any
        }
    };



    let searchBarShowing = 0
    

    return(
        <header className="header">
            <div className="headerLeft">
                <Link className='link' to={`/`}><h2>FLASHSCORE</h2></Link>
                
            </div>
            <div className="headerMid">
                
            </div>
            <div className="headerRight">
                <Link to={`/Favoritos`} className='botoesHeader'><i className="far fa-star"/></Link>
                
                {isAuthenticated ? (
                <>
                    {/* <span>Welcome, {username}</span> */}
                    <Link to={`/Profile`} className='botoesHeader'><i className="fas fa-user"/></Link>
                    <button onClick={handleLogout} className='botoesHeader'><i className="fas fa-sign-out-alt"></i></button>
                    </>
                ) : (
                <Link to={`/Login`} className='botoesHeader'><i className="fas fa-user"/></Link>
                )}

                </div>





        </header>
        
    )


}

export default Headerino;