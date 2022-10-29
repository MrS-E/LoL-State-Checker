import React from 'react';

function Searchbar(props) {
    return(
        <div>
            <input id="search"/>
            <button onClick={()=>{
                props.setName(document.getElementById("search").value);
                props.toSearch(true);
            }}>search</button>
        </div>
    );
}

export default Searchbar;