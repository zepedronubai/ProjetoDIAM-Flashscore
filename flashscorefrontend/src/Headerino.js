import './Headerino.css';
import { useState } from 'react';

function Headerino(){

    let searchBarShowing = 0
    
    const showSearchBar = () =>{
        const searchBar = document.getElementById("searchBar");
        console.log(searchBar)
        if(searchBarShowing === 0){
            searchBar.style.display = 'block' 
            searchBarShowing = 1
        }else{
            searchBar.style.display = 'none' 
            searchBarShowing = 0
        }
        
    }

    return(
        <header className="header">
            <div className="left">
                <h2>FLASHSCORE</h2>
            </div>
            <div className="mid">
                <input type="text" placeholder="" id="searchBar" className='searchBar'/>
            </div>
            <div className="right">
                
                <button onClick={showSearchBar}><i className="fas fa-search"></i></button>
                <button><i className="far fa-star"></i></button>
                <button><i className="fas fa-bars"></i></button>
                
            </div>

        </header>
        
    )


}

export default Headerino;