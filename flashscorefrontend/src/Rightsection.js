import React, { useState , useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import './Rightsection.css';

function RightSection(){
    const [username, setUsername] = useState('');
    const [isSuperuser, setIsSuperuser] = useState(false);

    window.addEventListener('storage', () => {
    console.log("Change to local storage! RightSection");
    setUsername(localStorage.getItem('username'));
    })
    useEffect(() => {
        checkIfSuperuser().then(result => {
            setIsSuperuser(result);
        });
    }, [username]);

    const checkIfSuperuser = async () => {
    try {
        const username = localStorage.getItem('username');
        console.log("DSADSADASD   " +username)
        const response = await axios.get(`http://127.0.0.1:8000/check_superuser/${username}/`);
        const isSuperuser = response.data.is_superuser;
        console.log("dsadasdasdsadasddasdad")
        console.log(isSuperuser);
        return isSuperuser;
    } catch (error) {
        console.error('Error checking superuser status:', error);
        return false;
    }
};
    return(

        <div className="right">
        {isSuperuser ? (

            <Link to={`/Admin`} className='button-link'>
            <button className='button'>
                <h2>Admin</h2>
                <i className="fas fa-user"/>
            </button>
        </Link>
            ) : null}
        </div>
    )
}


export default RightSection;