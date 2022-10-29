import React from 'react';
import "../css/Match.css";


function Summoner(props){
    return(
        <div>
            <img/>
            <p className="sum">{props.name}</p>
        </div>
    );
}

export default Summoner;