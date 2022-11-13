import React from 'react';

function Searchbar(props) {
    return(
        <div>
            <select id="regions">
                <option value="EUW1">EUW</option>
                <option value="EUN1">EUN</option>
                <option value="BR1">BR</option>
                <option value="JP1">JP</option>
                <option value="KR">KR</option>
                <option value="LA1">LA1</option>
                <option value="LA2">LA2</option>
                <option value="NA1">NA</option>
                <option value="OC1">OC</option>
                <option value="TR1">TR</option>
                <option value="RU">RU</option>
            </select>
            <input id="search"/>
            <button onClick={()=>{
                props.setName(document.getElementById("search").value);
                props.setRegion(document.getElementById("regions").value);
                props.toSearch(true);
            }}>search</button>
        </div>
    );
}

export default Searchbar;