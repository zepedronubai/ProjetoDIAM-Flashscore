import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Favoritos.css'
import Ligas from '../Ligas';

function Favoritos(){
    const { userID } = useParams();
    

    return(
        <div className="main">
            <p>Favoritos</p>
        </div>
    )
}

export default Favoritos;