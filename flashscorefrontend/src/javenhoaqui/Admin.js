import React, { useState, useEffect } from 'react';
import './Admin.css';
import './Homepage.css'
import axios from 'axios';

//import icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

//import functions to create objects
import {LigaCreate,EquipaCreate, JogadorCreate, JogoCreate} from './FormsToCreateObjects';

function Admin(){
    
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
          apiUrl = 'http://127.0.0.1:8000/jogo';
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


    return (
    <div className='backg'>
      <div className='sideBarButtonsDiv'>
        <button className='sideBarButtons' onClick={() => handleButtonClick("Ligas")}>Ligas</button>
        <button className='sideBarButtons' onClick={() => handleButtonClick("Equipas")}>Equipas</button>
        <button className='sideBarButtons' onClick={() => handleButtonClick("Jogadores")}>Jogadores</button>
        <button className='sideBarButtons' onClick={() => handleButtonClick("Jogos")}>Jogos</button>
      </div>
      <div className='mainContent'>
        {contentTitle && <h2 className='mainContentTitle'>{contentTitle}</h2>}
        {content && 
          <div className='mainContentLista'>
            {content.map((c) => 
            <div className='mainContentLine'>
              {contentTitle === "Jogadores" &&
                <div>
                  <img src={c.fotoDoJogador} />
                  <p>{c.nomeDoJogador}</p>
                </div>
              }
              {contentTitle === "Ligas" &&
                <div>
                <img src={c.logoDaLiga} />
                <p>{c.nomeDaLiga}</p>
                </div>
              }
              {contentTitle === "Equipas" &&
                <div>
                <img src={c.logoDaEquipa} />
                <p>{c.nomeDaEquipa}</p>
                <p>{c.sigla}</p>
                <p>{c.pontos}Pts</p>
                <p>{c.golos}Golos</p>
                </div>
              }
              {contentTitle === "Jogos" &&
                <div className='mainContentLineJogos'>
                  <p>{c.equipaDaCasa.nomeDaEquipa} </p>
                  <img src={c.equipaDaCasa.logoDaEquipa} />
                  <p>X</p>
                  <img src={c.equipaDeFora.logoDaEquipa} />
                  <p>{c.equipaDeFora.nomeDaEquipa} </p>
                </div>  
              }

              <button id={c.id} onClick={() => deleteLine(c.id)}>
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            </div>  
            )}
          </div>
        
        }
      </div>
      <div className='rightDiv'>
      <button className='addButton'>
        <FontAwesomeIcon icon={faPlus} className='addIcon'/>
        {createWhat}
      </button>

      </div>
    </div>
    );
};

function Teste(objetos){
    if(objetos>0){
        {objetos.map((objeto) =>(
            <div></div>
        ))}
    }
}


function BotoesComPoppup(){
  const [showPopup, setShowPopup] = useState(false);

    const togglePopup = () => {
      setShowPopup(!showPopup);
    };
  
    const createWhat = "equipa"

  return(
    <div className="button-with-popup">
        <button onClick={togglePopup}>Click Me</button>
        {showPopup && 
            <div className="popup">
            <div class="container">
            <h2>Registration Form</h2>
            <form>
                <input type="text" placeholder='Escolher foto' name="name" required/>
                <input type="email" placeholder="Nome da Equipa" name="email" required/>
                <input type="text" placeholder="Sigla" required/>
              
              <button type="submit">Submit</button>
              </form>
              </div>
            
            
        </div>}
      </div>
  )
}

export default Admin;