import React from 'react';
import './css/HomePopUp.css'
import useFetch from "../../hooks/useFetch";
import {get_request} from "../../other/links";
import {summoner_icon} from "../../other/links";
import Matches from "./matches/Matches";


const HomePopUp = (props) => {
    const url = get_request("summoner_by_name", "EUW1", "platform", [props.summoner], "query");
    const {data, loading, error} = useFetch(url);

    console.log(url);
    //if(error) console.error(error);
    if(props.trigger && data){
        const icon = summoner_icon + data.profileIconId + ".png";
        return(
            <div className="popup">
                <div className="popup-inner">
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
                        </div>
                    </div>
                    <div>
                        <Matches puuid={data.puuid} region="EUROPE"/>
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
                        <h4>Summoner not found try another Region</h4> {/*TODO autocheck other regions*/}
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