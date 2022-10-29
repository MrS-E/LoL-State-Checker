import React, {useState} from "react";
import './css/Home.css';
import Searchbar from "./Searchbar";
import HomePopUp from "./HomePopUp";


function Home() {
    const [name, changeName] = useState("");
    const [trigger, changeTrigger] = useState(false);

    return (
        <div id="side">
            <div className="center">
                <Searchbar setName={changeName} toSearch={changeTrigger}/>
            </div>
            <HomePopUp trigger={trigger} setTrigger={changeTrigger} summoner={name}/>
        </div>
    );
}

export default Home;
