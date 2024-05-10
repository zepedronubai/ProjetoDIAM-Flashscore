import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Ligas.css';
import { Link } from "react-router-dom";
import Liga from './pages/Liga';

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
                            <Link to={`/Liga/${l.id}`}>{l.nomeDaLiga}</Link>
                        </div>
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

export default Ligas;