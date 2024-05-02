import React, { useState, useEffect } from 'react';
import './Homepage.css';
import axios from 'axios';


function Homepage(){

    
    
    const [ligas, setLigas] = useState([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/ligas")
        .then(res => { setLigas(res.data); });
        }, []);

    const [jogos, setJogos] = {}

    return(
        <>
            <div className="allStuffContainer">
                <LeftSection/>
                <MainSection/>
                <RightSection/>
            </div>
        </>
    )



function MainSection(){
    return(
        <div className="mainSection">
            <div class="dataChanger">
                <button class="arrow-button left-arrow"><p class="textDataChanger">&lt;</p></button>
                <p class="textDataChanger">Hoje</p>
                <button class="arrow-button right-arrow"><p class="textDataChanger">&gt;</p></button>
            </div>

            <div class="jogosAtivos">

            </div>
        </div>
    )
}

function LeftSection(){
    return(
        <div className="leftSection">
            <h2>Ligas</h2>
                {ligas.map((l)=><div className='ligaContainer'><p>{l.nomeDaLiga}</p></div>)}
        </div>
    )
}

function RightSection(){
    return(
        <div className="rightSection">
            <h2>Right Section</h2>
        </div>
    )
}

}
export default Homepage;