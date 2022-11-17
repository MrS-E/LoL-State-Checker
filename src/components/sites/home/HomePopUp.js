import React from 'react';
import './css/HomePopUp.css'
import '../../css/PopUp.css'
import useFetch from "../../../hooks/useFetch";
import {get_region_from_platform, get_request, get_url} from "../../../other/js/links";
import Matches from "./matches/Matches";

const HomePopUp = (props) => {
    const url = get_request("summoner_by_name", props.region, "platform", [props.summoner], "query");
    const {data, loading} = useFetch(url);
    const games_num=10;
    const region = get_region_from_platform(props.region);

    if(props.trigger && data){
        console.log(data)
        const icon = get_url("summoner_icon", (data.profileIconId + ".png"));
        return(
            <div className="popup">
                <div className="popup-inner home_height_popup">
                    <div>
                        <button className="close-btn" onClick={() => props.setTrigger(false)}>close</button>
                        <div className="row">
                            <div className="col-1">
                                <img id="icon" src={icon} className="rounded-circle icon" alt={data.profileIconId}/>
                                <p id="icon_sub">level {data.summonerLevel}</p>
                            </div>
                            <div className="col-11">
                                <h3 id="summoner_name">{data.name}</h3>
                            </div>
                            <div>
                                {/*TODO make graph of the last 10 to 20 games*/}
                            </div>
                        </div>
                    </div>
                    <div className="HomePopUp_Matches">
                        <div className="HomePopUp_WinRate">
                            <h1><kbd>how many wins in the last games</kbd></h1> {/*FIXME i have to put wincount in matches, don't know how, but if i use a second request (from an other file) it's too many requests*/}
                        </div>
                        <div className="HomePopUp_MatchHistory">
                            {console.log(data.puuid)}
                            <Matches puuid={data.puuid} summmoner={data.name} region={region} games={games_num} platform={props.region}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    else if(props.trigger && loading){
        return(
            <div className="popup">
                <div className="popup-inner">
                    <div>
                        <button className="close-btn" onClick={() => props.setTrigger(false)}>close</button>
                        <h3>{props.summoner}</h3>
                    </div>
                    <div>
                        <h4>Loading</h4>
                    </div>
                </div>
            </div>
        );
    }
    else if(props.trigger){
        return(
            <div className="popup">
                <div className="popup-inner">
                    <div>
                        <button className="close-btn" onClick={() => props.setTrigger(false)}>close</button>
                        <h3>{props.summoner}</h3>
                    </div>
                    <div>
                        <h4>Summoner not found try another Region</h4> {/*TODO maybe autocheck other regions*/}
                    </div>
                </div>
            </div>
        );
    }
    else{
        return "";
    }
};

export default HomePopUp;