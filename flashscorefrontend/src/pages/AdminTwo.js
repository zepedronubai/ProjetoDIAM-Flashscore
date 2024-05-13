import React, { useState, useEffect } from 'react';
import "./AdminTwo.css"
import axios from 'axios';
import { Link } from "react-router-dom";

//import icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

//import functions to create objects
import {LigaCreate,EquipaCreate, JogadorCreate, JogoCreate} from './FormsToCreateObjects';
import Ligas from './Ligas';

function AdminTwo(){
    
    //var que tem o content que aparece no main display em html, ex: botao selecionado=ligas content=<p>ligas</p>
      const [content, setContent] = useState(null);
      const [contentTitle, setContentTitle] = useState("")
      const [createWhat, setCreateWhat] = useState(null)

      useEffect(() => {
        handleButtonClick("Ligas");
      }, []);

      //funcao que da update ao main content consoante o botao carregado
      const handleButtonClick = (content) => {
        getContent(content).then(newContent => {
          setContent(newContent);
          setContentTitle(content)
          if(content=="Ligas")
            setCreateWhat(<LigaCreate onUpdateMainSection={updateMainSection}/>)
          if(content=="Equipas")
            setCreateWhat(<EquipaCreate onUpdateMainSection={updateMainSection}/>)
          if(content=="Jogadores")
            setCreateWhat(<JogadorCreate onUpdateMainSection={updateMainSection}/>)
          if(content=="Jogos")
            setCreateWhat(<JogoCreate onUpdateMainSection={updateMainSection}/>)
        });
      };
    
      const getContent = (whatContent) => {
        let contentArray = [];
        let apiUrl = '';
      
        if (whatContent === "Ligas") {
          apiUrl = 'http://127.0.0.1:8000/ligas';
        } else if (whatContent === "Equipas") {
          apiUrl = 'http://127.0.0.1:8000/equipas';
        } else if (whatContent === "Jogadores"){
          apiUrl = 'http://127.0.0.1:8000/jogadores';
        } else if (whatContent === "Jogos"){
          apiUrl = 'http://127.0.0.1:8000/todosJogos';
        }else {
          return Promise.resolve([]); // Return empty array if content is not recognized
        }
      
        return axios.get(apiUrl)
          .then(res => {
            contentArray = res.data;
            return contentArray;
          })
          .catch(error => {
            console.error('Error fetching data:', error);
            return []; // Return empty array if there's an error
          });
      };

    // Callback function to update main section content
    const updateMainSection = (newContent) => {
      setContent(newContent);
    };  

    const deleteLine = (id) => {
      const isConfirmed = window.confirm("Are you sure you want to delete this item?");
      if (isConfirmed) {
      let apiUrl = '';

      if (contentTitle === "Ligas") {
        apiUrl = 'http://127.0.0.1:8000/deleteLiga/';
      } else if (contentTitle === "Equipas") {
        apiUrl = 'http://127.0.0.1:8000/deleteEquipa/';
      } else if (contentTitle === "Jogadores"){
        apiUrl = 'http://127.0.0.1:8000/deleteJogador/';
      } else if (contentTitle === "Jogos"){
        apiUrl = 'http://127.0.0.1:8000/deleteJogo/';
      }else {
        return Promise.resolve([]); // Return empty array if content is not recognized
      }

      axios.delete(apiUrl + id + '/')
        .then(response => {
          // If delete is successful, fetch data again to update the content
          getContent(contentTitle).then(updatedContent => {
            // Update the content state with the updated content
            setContent(updatedContent);
          })
          .catch(error => {
            console.error('Error updating content after deletion:', error);
          });
        })
        .catch(error => {
          console.error('Error deleting data:', error);
        });
    };
  }

  const formateDateToHourAndMinutes = (date) => {
    const fullDate = new Date(date)
    const hours = fullDate.getHours();
    const minutes = fullDate.getMinutes();
    return(hours + ":" + minutes)
}

    return (
      <body className='body'>
      <section class="container">
          <section class="left">
            <button className='sideBarButtons' onClick={() => handleButtonClick("Ligas")}>
              <p className='sideBarButtonsName'>Ligas</p>
            </button>
            <button className='sideBarButtons' onClick={() => handleButtonClick("Equipas")}>
              <p className='sideBarButtonsName'>Equipas</p>
            </button>
            <button className='sideBarButtons' onClick={() => handleButtonClick("Jogadores")}>
              <p className='sideBarButtonsName'>Jogadores</p>
            </button>
            <button className='sideBarButtons' onClick={() => handleButtonClick("Jogos")}>
              <p className='sideBarButtonsName'>Jogos</p>
            </button>
          </section>
          <section class="main">
            {contentTitle && <h1 className='mainContentTitle'>{contentTitle}</h1>}
            {content && 
              <section className='mainContentLista'>
                {content.map((c) => 
                <section className='mainContentLine'>
                  {contentTitle === "Jogadores" &&
                    <section>
                      <img src={c.fotoDoJogador} />
                      <p>{c.nomeDoJogador}</p>
                    </section>
                  }
                  {contentTitle === "Ligas" &&
                    <section>
                    <img src={c.logoDaLiga} />
                    <Link className='links' to={`/Liga/${c.id}`}>{c.nomeDaLiga}</Link>
                    
                    </section>
                  }
                  {contentTitle === "Equipas" &&
                    <section>
                    <img src={c.logoDaEquipa} />
                    <Link className='links' to={`/Equipa/${c.id}`}>{c.nomeDaEquipa}</Link>
                    </section>
                  }
                  {contentTitle === "Jogos" &&
                    <section className='mainContentLineJogos'>
                      <Link className='links' to={`/Equipa/${c.equipaDaCasa.id}`}>{c.equipaDaCasa.nomeDaEquipa}</Link>
                      <img src={c.equipaDaCasa.logoDaEquipa} />
                      <section>
                        <p>{formateDateToHourAndMinutes(c.horaDoJogo)}</p>
                        <p>X</p>
                      </section>
                      <img src={c.equipaDeFora.logoDaEquipa} />
                      <Link className='links' to={`/Equipa/${c.equipaDeFora.id}`}>{c.equipaDeFora.nomeDaEquipa}</Link>
                    </section>  
                  }

                  <button id={c.id} className='iconApagar' onClick={() => deleteLine(c.id)}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </section>  
                )}
              </section>
            }
        </section>
          <section class="right">
            {createWhat}
          </section>
      </section>
      </body>
    );
};


export default AdminTwo;