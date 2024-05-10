    import axios from 'axios';
    import React, { useState, useEffect } from 'react';
    import './Liga.css'
    import Ligas from '../Ligas';
    import RightSection from '../Rightsection';
    import { useParams } from 'react-router-dom';

    function Liga(){
        const ligaId = useParams();
        console.log("oi")
        var ligaIdInt = ligaId.ligaId
        console.log(ligaIdInt)

        return(
                <div className='container'>
                    <Ligas/>
                    <LigaInfoSection ligaId={ligaId}/>
                    <RightSection/>
                </div>
            )
    
    }


    function LigaInfoSection({ligaId}){

        const [data, setData] = useState(null);
        const [liga, setLiga] = useState(null);
        const [equipas, setEquipas] = useState(null);
        var ligaIdInt = ligaId.ligaId

        useEffect(() => {
            if (data) {
                setLiga(data.liga);
                setEquipas(data.equipas);
            }
        }, [data]);

        useEffect(() => {
            console.log(ligaIdInt)
            axios.get(`http://127.0.0.1:8000/liga/${ligaIdInt}`)
            .then(res => { 
                setData(res.data);
                
            });
            }, []);
            

        const carregaBotao = (botaoCarregado) => {
            if(botaoCarregado=='Tabela')
                console.log("oi")
            else if(botaoCarregado=='Stats')
                console.log("adeus")
            else
                console.log("oi adeus")
        }


        if (!data || !liga || !equipas)
                return <p>Loading...</p>; // Display a loading message while fetching data
        else{
            return(
                <>
                    <div className='main'>
                        <div className='ligaName'>
                            <img src={liga.logoDaLiga}/>
                            <h1>{liga.nomeDaLiga}</h1>
                        </div>
                        <div className='botoes'>
                            <button onClick={() => carregaBotao('Tabela')}>Tabela</button>
                            <button onClick={() => carregaBotao('Stats')}>Stats</button>
                            <button onClick={() => carregaBotao('Melhores')}>Melhores</button>
                        </div>
                        <div className='equipas'>
                            <div className='nomesColunas'>
                                <p className='firstNome'>#</p>
                                <div className="restoNomes">
                                    <p className='nomeToPutMaring'>GM</p>
                                    <p >GS</p>
                                    <p >Pts</p>    
                                </div>    
                            </div>
                            {equipas.map((equipa,index) => (
                                <div className='equipaDiv'>
                                    <div className='posiFotoENomeEquipa'>
                                        <p className='orderNumber'>{index + 1}</p>
                                        <img src='#'/>
                                        <p className='nomeEquipa'>{equipa.nomeDaEquipa}</p>
                                    </div>
                                    <div className='restoInfoEquipa'>
                                        <p className='nomeToPutMaringg'>{equipa.golos}</p>
                                        <p className='nomeToPutMaringg'>{equipa.golosSofridos}</p>
                                        <p className='nomeToPutMaringgg'>{equipa.pontos}</p>
                                    </div>
                                </div>
                                
                            ))}
                        </div>
                    </div>
                </>
            )
        }
    }




    export default Liga;