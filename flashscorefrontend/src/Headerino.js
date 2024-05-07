import './Headerino.css';
import { useState } from 'react';
import axios from 'axios';

function Headerino(){

    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showRegisterForm, setShowRegisterForm] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');

    const toggleLoginForm = () => {
        setShowLoginForm(!showLoginForm);
        setShowRegisterForm(false);
    };

    const toggleRegisterForm = () => {
        setShowRegisterForm(!showRegisterForm);
        setShowLoginForm(false);
    };


    const handleLogin = async (e) => {
        e.preventDefault();
        const username = e.target.elements.username.value;
        const password = e.target.elements.password.value;

        try {
            const response = await axios.post('http://127.0.0.1:8000/login/', {
                username: username,
                password: password
            });

            // Handle successful login response
            console.log('Login successful:', response.data);
            setIsLoggedIn(true);
            setUsername(username);
            localStorage.setItem('token', response.data);
            } catch (error) {
            // Handle login error
            console.error('Login error:', error);
            alert('Credenciais Inválidas')
        }
    };

    const handleLogout = async (e) => {

        try {
            const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
            const response = await axios.post('http://127.0.0.1:8000/logout/', {token}, {

        });
            console.log('Logout successful:', response.data);
            setIsLoggedIn(false);
            setUsername('');
            // Perform additional actions after successful logout, such as redirecting the user
        } catch (error) {
            console.error('Logout error:', error);
            // Handle logout error, if any
        }
    };



    const handleRegistration = async (e) => {
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
        // You can perform actions like redirecting to another page or showing a success message to the user
    } catch (error) {
        // Handle registration error
        console.error('Registration error:', error);
        // You can display an error message to the user or perform other actions based on the error
    }
};




    let searchBarShowing = 0
    
    const showSearchBar = () =>{
        const searchBar = document.getElementById("searchBar");
        console.log(searchBar)
        if(searchBarShowing === 0){
            searchBar.style.display = 'block' 
            searchBarShowing = 1
        }else{
            searchBar.style.display = 'none' 
            searchBarShowing = 0
        }
        
    }

    return(
        <header className="header">
            <div className="left">
                <h2>FLASHSCORE</h2>
            </div>
            <div className="mid">
                <input type="text" placeholder="" id="searchBar" className='searchBar'/>
            </div>
            <div className="right">
                
                <button onClick={showSearchBar}><i className="fas fa-search"></i></button>
                <button><i className="far fa-star"></i></button>
                <button><i className="fas fa-bars"></i></button>

                 {isLoggedIn ? (
                 <>
                    <span>Welcome, {username}</span>
                    <button onClick={handleLogout}>Logout</button>
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
                    <form className="dropdownForm">
                        <input type="text" placeholder="Username"/>
                        <input type="email" placeholder="Email"/>
                        <input type="password" placeholder="Password"/>
                        <button type="submit">Register</button>
                    </form>
                )}
                
            </div>

        </header>
        
    )


}

export default Headerino;