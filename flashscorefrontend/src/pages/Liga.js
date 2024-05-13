    import axios from 'axios';
    import React, { useState, useEffect } from 'react';
    import './Liga.css'
    import Ligas from './Ligas';
    import RightSection from '../Rightsection';
    import { useParams } from 'react-router-dom';
    import { Link } from "react-router-dom";

    function Liga(){
        const ligaId = useParams();
        console.log("oi")
        var ligaIdInt = ligaId.ligaId
        console.log(ligaIdInt)

        return(
                <section className='container'>
                    <Ligas/>
                    <LigaInfoSection ligaId={ligaId}/>
                    <RightSection/>
                </section>
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
            }, [ligaId]);
            

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
                    <section className='main'>
                        <section className='ligaName'>
                            <img src={liga.logoDaLiga}/>
                            <h1>{liga.nomeDaLiga}</h1>
                        </section>
                        <section className='equipas'>
                            <section className='nomesColunas'>
                                <p className='firstNome'>#</p>
                                <section className="restoNomes">
                                    <p className='nomeToPutMaring'>GM</p>
                                    <p >GS</p>
                                    <p >Pts</p>    
                                </section>    
                            </section>
                            {equipas.map((equipa,index) => (
                                <section className='equipaDiv'>
                                    <section className='posiFotoENomeEquipa'>
                                        <p className='orderNumber'>{index + 1}</p>
                                        <img src='#'/>
                                        <Link to={`/Equipa/${equipa.id}`} className='nomeEquipa'>{equipa.nomeDaEquipa}</Link>
                                        
                                    </section>
                                    <section className='restoInfoEquipa'>
                                        <p className=''>{equipa.golos}</p>
                                        <p className=''>{equipa.golosSofridos}</p>
                                        <p className=''>{equipa.pontos}</p>
                                    </section>
                                </section>
                                
                            ))}
                        </section>
                    </section>
                </>
            )
        }
    }




    export default Liga;