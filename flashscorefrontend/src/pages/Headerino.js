import './Headerino.css';
import { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

function Headerino(){

    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showRegisterForm, setShowRegisterForm] = useState(false);

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
            const response = await axios.post('http://127.0.0.1:8000', {
                username: username,
                password: password
            });

            // Handle successful login response
            console.log('Login successful:', response.data);
            // You can perform actions like redirecting to another page or updating state to indicate the user is logged in
        } catch (error) {
            // Handle login error
            console.error('Login error:', error);
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
            <div className="headerLeft">
                <Link className='link' to={`/`}><h2>FLASHSCORE</h2></Link>
                
            </div>
            <div className="headerMid">
                <input type="text" placeholder="" id="searchBar" className='searchBar'/>
            </div>
            <div className="headerRight">
                
                <button onClick={showSearchBar}><i className="fas fa-search"></i></button>
                <button><i className="far fa-star"></i></button>
                <button><i className="fas fa-bars"></i></button>

                <button onClick={toggleLoginForm}><i className="fas fa-sign-in-alt"></i> Login</button>
                <button onClick={toggleRegisterForm}><i className="fas fa-user-plus"></i> Register</button>
                {showLoginForm && (
                    <form className="dropdownForm" onSubmit={handleLogin}>
                        <input type="text" placeholder="Username" name="username"/>
                        <input type="password" placeholder="Password" name="password"/>
                        <button type="submit">Login</button>
                    </form>
                )}
                {showRegisterForm && (
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