import React, {useState} from 'react';
import {get_request} from "../../../other/links";
import useFetch from "../../../hooks/useFetch";
import '../css/Match.css'
import {summoner_icon, icon} from "../../../other/links";
import {map} from "../../../other/links";
import ChampPopUp from "../../champions/ChampPopUp";

/*TODO wird irgendwie 4mal ausgeführt*/
const Match = (props) => {
    const url = get_request("match_by_id",props.region,"region",[props.id],"query");
    const {data,loading} = useFetch(url);
    const [champ_trigger, champ_changeTrigger] = useState(false);
    const queue = require('../../../files/queue.json'); //TODO use later with stored values
    if (loading) return <h6>Loading</h6>;
    if(data && queue) {
        const game={
            summoner_blue: [],
            summoner_red: [],
            kda: [],
            items: [],
            champion: "",
            gold: 0,
            CS: 0,
            visionScore: 0,
            className: "c200",
            triplekill: "",
            quatrakill: "",
            pentakill: "",

        }
        for(let x=0;x<data.info.participants.length;x++){
            if(x<5){
                game.summoner_blue.push([data["info"]["participants"][x]["summonerName"],data["info"]["participants"][x]["profileIcon"]]);
            }else if(x<10){
                game.summoner_red.push([data["info"]["participants"][x]["summonerName"],data["info"]["participants"][x]["profileIcon"]]);
            }
            if(data["info"]["participants"][x]["summonerName"]===props.summoner) {
                if(data["info"]["participants"][x]["win"]===true) game.className="c100";
                if(data["info"]["participants"][x]["tripleKills"]>0) game.triplekill="tk1";
                if(data["info"]["participants"][x]["quadraKills"]>0) game.quatrakill="qk1";
                if(data["info"]["participants"][x]["pentaKills"]>0) game.pentakill="pk1";
                game.kda.push(data["info"]["participants"][x]["kills"],data["info"]["participants"][x]["deaths"],data["info"]["participants"][x]["assists"]);
                game.champion = data["info"]["participants"][x]["championName"];
                game.items.push(data["info"]["participants"][x]["item0"],data["info"]["participants"][x]["item1"],data["info"]["participants"][x]["item2"],data["info"]["participants"][x]["item3"],data["info"]["participants"][x]["item4"],data["info"]["participants"][x]["item5"],data["info"]["participants"][x]["item6"]);
                game.gold = data["info"]["participants"][x]["goldEarned"];
                game.CS = (data["info"]["participants"][x]["totalMinionsKilled"])+(data["info"]["participants"][x]["neutralMinionsKilled"]);
                game.visionScore = data["info"]["participants"][x]["visionScore"];
            }

        }
        const search = queue.find((qu) => qu.queueId === data.info.queueId);
        console.log(search)
        return (
            <>
                <div className={game.className + " games " + game.triplekill + " " + game.quatrakill + " " + game.pentakill} id={props.id}>
                    <div className="match_title">
                        {/*<h6>{data.info.gameMode}</h6>*/}
                        <h6>{search.description.replace(" games", "")}</h6>
                        <p>{new Date(data.info.gameEndTimestamp).toLocaleDateString('de-DE', {year: 'numeric', month: 'short', day: 'numeric'}) /*Date from Unix Timestamp*/}</p>
                        <img className="map" alt={"map"+data.info.mapId} src={map+"map"+data.info.mapId+".png"}/>
                    </div>
                    <div>
                        {/*TODO Item Build*/}
                        {/*TODO Gold earned*/}
                        {/*TODO CS (totalMinionsKilled + neutralMinionsKilled)*/}
                        {/*TODO visionScore*/}
                    </div>
                    <div className="champ">
                        <img src={icon + game.champion + ".png"} className="rounded-circle icon champ_img" alt={game.champion} onClick={()=>champ_changeTrigger(true)}/>
                        <div>
                            <p><strong>KDA</strong> <br/> {game.kda[0]}/{game.kda[1]}/{game.kda[2]}</p>
                        </div>
                    </div>
                    <div className="summoner">
                        <div className="sum_blue">
                            {game.summoner_blue.map((x, i)=>{return(<p key={i+"_blue"} className="sum"><img src={summoner_icon+x[1]+".png"} className="rounded-circle icon img" alt={x[1]}/>{x[0]}</p>)})}
                        </div>
                        <div className="sum_red">
                            {game.summoner_red.map((x, i)=>{return(<p key={i+"_red"} className="sum"><img src={summoner_icon+x[1]+".png"} className="rounded-circle icon img" alt={x[1]}/>{x[0]}</p>)})}
                        </div>
                    </div>
                </div>
                <ChampPopUp  trigger={champ_trigger} champ={game.champion} setTrigger={champ_changeTrigger}/>
            </>
        );
    }
};
//team 200 read side
//team 100 blue side

export default Match;
//https://europe.api.riotgames.com/lol/match/v5/matches/EUW1_6124408693?api_key=RGAPI-31a604c2-66e3-4239-b8ec-00e6acb01ac2