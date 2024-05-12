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
            // Perform additional actions after successful logout, such as redirecting the user
        } catch (error) {
            console.error('Logout error:', error);
            // Handle logout error, if any
        }
    };


    /*const handleRegistration = async (e) => {
    e.preventDefault();
    const username = e.target.elements.username.value;
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;


    try {

        const response = await axios.post('http://127.0.0.1:8000/register/', {
            username: username,
            email: email,
            password: password
        });

        // Handle successful registration response
        console.log('Registration successful:', response.data);
        toggleRegisterForm();
    } catch (error) {
        // Handle registration error
        console.error('Registration error:', error);
        // You can display an error message to the user or perform other actions based on the error
    }
};

    const fetchUserData = async () => {
        setShowPagina(!showPagina);
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }

        const response = await axios.post('http://127.0.0.1:8000/user-info/',{token}, {

        });

        setUserData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle authentication error or other errors
      }

}*/
    let searchBarShowing = 0
    

    return(
        <header className="header">
            <div className="headerLeft">
                <Link className='link' to={`/`}><h2>FLASHSCORE</h2></Link>
                
            </div>
            <div className="headerMid">
                
            </div>
            <div className="headerRight">
                <Link to={`/Favoritos`} className='ligaNome'><i className="far fa-star"/></Link>
                <button><i className="fas fa-bars"></i></button>




                {isAuthenticated ? (
                <>
                    <span>Welcome, {username}</span>
                    <button onClick={handleLogout} ><i className="fas fa-sign-out-alt"></i>Logout</button>
                    </>
                ) : (
                <Link to={`/Login`} className='ligaNome'><i className="fas fa-user"/></Link>
                )}


                 {/* {isLoggedIn ? (
                 <>
                    <span>Welcome, {username}</span>

                    <button onClick={fetchUserData} ><i className="paginapessoal"></i> Pagina Pessoal</button>
                    </>
                ) : (
                    <>
                        <button onClick={toggleLoginForm}><i className="fas fa-sign-in-alt"></i> Login</button>
                        <button onClick={toggleRegisterForm}><i className="fas fa-user-plus"></i> Register</button>
                    </>
                )}

                {showLoginForm && !isLoggedIn && (
                    <form className="dropdownForm" onSubmit={handleLogin}>
                        <input type="text" placeholder="Username" name="username"/>
                        <input type="password" placeholder="Password" name="password"/>
                        <button type="submit">Login</button>
                    </form>
                )}
                {showRegisterForm && !isLoggedIn && (
                    <form className="dropdownForm" onSubmit={handleRegistration}>
                        <input type="text" placeholder="username" name="username"/>
                        <input type="email" placeholder="email"name="email"/>
                        <input type="password" placeholder="password" name="password"/>
                        <button type="submit">Register</button>
                    </form>
                )}
                <div ><i className="UserDetailsElement"></i>
                     {showPagina && userData && isLoggedIn && (
                        <>
                         <p><strong>Name:</strong> {userData.username}</p>
                        <p><strong>Email:</strong> {userData.email}</p>
                         </>
                     )} */}
                </div>





        </header>
        
    )


}

export default Headerino;