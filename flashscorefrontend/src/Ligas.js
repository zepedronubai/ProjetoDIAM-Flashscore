import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Ligas.css';



function Ligas(){
     //fetch das ligas para mostrar na section da esquerda
     const [ligas, setLigas] = useState([]);
     useEffect(() => {
         axios.get("http://127.0.0.1:8000/ligas")
         .then(res => { setLigas(res.data); });
         }, []);
 
     console.log(ligas)


    if(ligas.length>0)
        return(
                <div className="left">
                        {ligas.map((l)=>
                        <div className='sideBarButtons' >
                            <a href='#' id={l.id}>
                                {l.nomeDaLiga}
                            </a>
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