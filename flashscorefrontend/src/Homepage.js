import React, { useState, useEffect } from 'react';
import './Homepage.css';
import axios from 'axios';

function Homepage(){

    
    //fetch das ligas para mostrar na section da esquerda
    const [ligas, setLigas] = useState([]);
    useEffect(() => {
        axios.get("http://127.0.0.1:8000/ligas")
        .then(res => { setLigas(res.data); });
        }, []);

    console.log(ligas)
    //fetch aos jogos a mostrar na main section do dia x
    //const targetDate = '2024-05-02';
    const formatDate = (date) => {
        console.log("DATA:" + date.getHours())
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    

    

    

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

    const [jogos, setJogos] = useState([]);
    const today = new Date();
    let targetDate = formatDate(today);
    const [dateToBeFetched, setDateToBeFetched] = useState(targetDate)
    const [daysMoving, setDaysMoving] = useState(0);

    useEffect(() => {
        GetTheGames();
    }, [dateToBeFetched]);

    function GetTheGames() {
        axios.get(`http://127.0.0.1:8000/ligasejogos?date=${dateToBeFetched}`)
            .then(res => { setJogos(res.data); })
            .catch(error => { console.error('Error fetching data:', error); });
    }
    
    function updateDateToBeFetched(nextOrBack) {
        setDaysMoving(prevDaysMoving => {
            const updatedDaysMoving = nextOrBack === "next" ? prevDaysMoving + 1 : prevDaysMoving - 1;
            console.log("updatedDaysMoving:", updatedDaysMoving);
            const todayToModify = new Date(today);
            todayToModify.setDate(todayToModify.getDate() + updatedDaysMoving);
            const targetDate = formatDate(todayToModify);
            setDateToBeFetched(targetDate);
            return updatedDaysMoving;
        });
    }

    const formateDateToHourAndMinutes = (date) => {
        const fullDate = new Date(date)
        const hours = fullDate.getHours();
        const minutes = fullDate.getMinutes();
        console.log(hours)
        return(hours + ":" + minutes)
    }
    
    return(
        <div className="mainSection">
            <div className="dataChanger">
                <button className="arrow-button left-arrow" onClick={() => updateDateToBeFetched("back")}><p class="textDataChanger">&lt;</p></button>
                <p className="textDataChanger">{dateToBeFetched}</p>
                <button className="arrow-button right-arrow" onClick={() => updateDateToBeFetched("next")} ><p class="textDataChanger">&gt;</p></button>
            </div>

            <div className="jogosAtivos">
            {jogos.map((liga) => (
                <div key={liga.nomeDaLiga} className="cadaLigaComJogosContainer">
                    <h2 className='nomeDaLiga'>{liga.nomeDaLiga}</h2>
                    {liga.jogosDaLiga.map((jogo) => (
                        <div key={jogo.id} className='jogoContainer'>

                            <div className='equipasDoJogoLeft'>
                            <h4>{jogo.equipaDaCasa.nomeDaEquipa} </h4>
                            <img src={jogo.equipaDaCasa.logoDaEquipa}/>
                            </div>
                            <div className='horaDoJogo'>
                                <h5>{formateDateToHourAndMinutes(jogo.horaDoJogo)}</h5>
                                <h5>X</h5>
                            </div>
                            <div className='equipasDoJogoRight'>
                            <img src={jogo.equipaDeFora.logoDaEquipa}/>
                            <h4> {jogo.equipaDeFora.nomeDaEquipa} </h4>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
            </div>
        </div>
    )
}

function LeftSection(){
    if(ligas.length>0)
        return(
            <div className="leftSection">
                <h2>Ligas</h2>
                    {ligas.map((l)=>
                    <div className='ligaContainer'><p>{l.nomeDaLiga}</p></div>
                    
                    )}
            </div>
        )
    else
        return(
            <div className="leftSection">
            <h2>Tao</h2>
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