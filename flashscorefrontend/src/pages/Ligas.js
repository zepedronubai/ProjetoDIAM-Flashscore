import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Ligas.css';
import { Link } from "react-router-dom";
import Liga from './Liga';

function Ligas(){
     //fetch das ligas para mostrar na section da esquerda
     const [ligas, setLigas] = useState([]);
     useEffect(() => {
         axios.get("http://127.0.0.1:8000/ligas")
         .then(res => { setLigas(res.data); });
         }, []);
 
     console.log(ligas)

    // function RedirectToLigaPage(ligaId){
    //     const history = useHistory();
    //     history.push(`/Liga/${ligaId}`)
    // }

    if(ligas.length>0)
        return(
                <div className="left">
                        {ligas.map((l)=>
                        <div className='sideBarButtons' >
                            {/* <button className='sideBarButtons' id={l.id} onClick={() => redirectToLigaPage(l.id)}>
                                {l.nomeDaLiga}
                            </button> */}
                            <Link to={`/Liga/${l.id}`} className='sideBarButtonsName'>{l.nomeDaLiga}</Link>
                        </div>
                        )}
                </div>
        )
    else
        return(
            <div className="left">
            <h2>Não há ligas disponiveis</h2>
        </div>
    )
}

export default Ligas;