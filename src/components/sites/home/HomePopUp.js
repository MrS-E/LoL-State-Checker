import React, {useEffect, useState} from 'react';
import './css/HomePopUp.css'
import '../../css/PopUp.css'
import {get_region_from_platform, get_request, get_url} from "../../../other/js/links";
import Matches from "./matches/Matches";
import axios from "axios";
import WinGraph from "./WinGraph";

const  HomePopUp =  (props) => {
    const [data, setSumData] = useState(undefined);
    const [games, setGames] = useState([])
    const [loading, setLoading] = useState(true);
    const [wins, setWins] = useState(0);

    useEffect(()=>{
        setLoading(true);
        setGames([]);
        setSumData(undefined);
        setWins(0);
        if(props.trigger) {
            get_games(props.summoner, props.region, 0, 10).then(({summoner, games}) => {
                let win = 0
                games.forEach((d) => {
                    for (let x = 0; x < d.info.participants.length; x++) {
                        if (d["info"]["participants"][x]["summonerName"] === summoner.name && d["info"]["participants"][x]["win"]) win++;
                    }
                })
                setGames(games)
                setSumData(summoner);
                setWins(win);
                setLoading(false);

            })
        }
    },[props.trigger])

    if(props.trigger && data){
        const icon = get_url("summoner_icon", [data.profileIconId]);
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
                        </div>
                    </div>
                    <div className="HomePopUp_Matches">
                        <div className="HomePopUp_WinRate">
                            <h5>{wins}/{games.length} wins in the last games</h5>
                            <div>
                                <WinGraph wins={wins} loses={(games.length - wins)}/>
                            </div>
                        </div>
                        <div className="HomePopUp_MatchHistory">
                            <Matches summmoner={data.name} data={games} region={props.region}/>
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
                        <h4>Summoner not found try another Region</h4>
                    </div>
                </div>
            </div>
        );
    }
    else{
        return "";
    }
};

async function get_games(player, server, games_num_start, games_num_end, ){
    const res1 = await axios.get(get_request("summoner_by_name", server, "platform", [player], "query"));
    const summoner = res1.data;
    const res2 = await axios.get(get_request("match_ids_by_puuid", get_region_from_platform(server), "region", [summoner.puuid, games_num_start, games_num_end], "query"))
    const game_arr = res2.data
    const games = [];
    for (const game of game_arr) {
        const g = await axios.get(get_request("match_by_id", get_region_from_platform(server), "region", [game], "query"));
        games.push(g.data);
    }
    return {summoner, games};
}

export default HomePopUp;