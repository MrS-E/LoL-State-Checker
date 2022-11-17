import React, {useState} from "react";
import './css/Home.css';
import Searchbar from "./Searchbar";
import HomePopUp from "./HomePopUp";
import image from '../../../other/files/home_bg.jpg'; //TODO bg austauschen


function Home() {
    const [name, changeName] = useState("");
    const [region, changeRegion] = useState("EUW1");
    const [trigger, changeTrigger] = useState(false);

    const bg={
        backgroundImage: `url(${image})`,
        height:'calc(100vh - 56px)',
        width:'100vw',
        left:0,
        position:'absolute',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
    };

    return (
        <div id="side" style={bg}>
            <div className="center">
                <Searchbar setName={changeName} toSearch={changeTrigger} setRegion={changeRegion}/>
            </div>
            <HomePopUp trigger={trigger} setTrigger={changeTrigger} summoner={name} region={region}/>
        </div>
    );
}

export default Home;
