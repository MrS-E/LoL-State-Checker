import React, {useEffect, useRef, useState} from 'react';
import {get_url} from "../../../../other/js/links";
import '../css/Match.css'
import ChampPopUp from "../../champions/ChampPopUp";
import HomePopUp from "../HomePopUp";
import spacer1 from "../../../../other/files/spacer1.png";

const Match = (props) => {
    const data = props.data;
    const div = useRef(null);
    const [champ_trigger, champ_changeTrigger] = useState(false);
    const [sum_trigger, sum_changeTrigger] = useState(false);
    const [summonerName_popup, changeSummonerName_popup] = useState("");

    const [queue, changeData] = useState(undefined);
    useEffect(()=> {
        try {
            changeData(JSON.parse(localStorage.getItem('queues')));
        } catch (e) {

        }
    }, [localStorage.getItem('queues')])

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
            totalDamage: 0,
            className: "c200",
            triplekill: "",
            quatrakill: "",
            pentakill: ""
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
                game.items.push(data["info"]["participants"][x]["item0"],data["info"]["participants"][x]["item1"],data["info"]["participants"][x]["item2"],data["info"]["participants"][x]["item3"],data["info"]["participants"][x]["item4"],data["info"]["participants"][x]["item5"]);
                game.gold = data["info"]["participants"][x]["goldEarned"];
                game.CS = (data["info"]["participants"][x]["totalMinionsKilled"])+(data["info"]["participants"][x]["neutralMinionsKilled"]);
                game.visionScore = data["info"]["participants"][x]["visionScore"];
                game.totalDamage= data["info"]["participants"][x]["totalDamageDealt"];
            }

        }
        const search = queue.find((qu) => qu.queueId === data.info.queueId);

        return (
            <>
                <div ref={div} className={game.className + " games " + game.triplekill + " " + game.quatrakill + " " + game.pentakill} id={props.id}>
                    <div className="match_title">
                        {/*<h6>{data.info.gameMode}</h6>*/}
                        <h6 className="title">{search.description.replace(" games", "").replace("5v5 ", "")}</h6>
                        <p className="date">{new Date(data.info.gameEndTimestamp).toLocaleDateString('de-DE', {year: 'numeric', month: 'short', day: 'numeric'}) /*Date from Unix Timestamp*/}</p>
                        <img className="map" alt={"map"+data.info.mapId} src={get_url("map",[data.info.mapId])}/>
                    </div>
                    <div className="stats">
                        <div className="items_div">
                            {game.items.map((x, id)=>{if(x<1001)return(<img className="item" key={id} src={spacer1} alt={"item_"+x}/>);return(<img className="item" key={id} src={get_url("items",  [(x + ".png")])} alt={"item_"+x}/>);})}
                        </div>
                        <div className="stats_text">
                            <span><strong>DMG</strong><br/> {game.totalDamage}</span><br/>
                            <span><strong>CS</strong><br/> {game.CS}</span><br/>
                            <span><strong>Gold</strong><br/> {game.gold}</span><br/>
                            <span><strong>Vision</strong><br/> {game.visionScore}</span><br/>
                        </div>
                    </div>
                    <div className="champ">
                        <img src={get_url("icon", [(game.champion + ".png")])} className="rounded-circle icon champ_img" alt={game.champion} onClick={()=>champ_changeTrigger(true)}/>
                        <div>
                            <Kill game={game}/>
                            <p className="KDA"><strong>KDA</strong><br/>{game.kda[0]}/{game.kda[1]}/{game.kda[2]}</p>
                        </div>
                    </div>
                    <div className="summoner">
                        <div className="sum_blue">
                            {game.summoner_blue.map((x, i)=>{return(<div className="summoner_point" onClick={()=>{sum_changeTrigger(true);changeSummonerName_popup(x[0]);}}><p key={i+"_blue"} className="sum"><img src={get_url("summoner_icon",[x[1]])} className="rounded-circle icon img" alt={x[1]}/>{x[0]}</p></div>)})}
                        </div>
                        <div className="sum_red">
                            {game.summoner_red.map((x, i)=>{return(<div className="summoner_point" onClick={()=>{sum_changeTrigger(true);changeSummonerName_popup(x[0]);}}><p key={i+"_red"} className="sum"><img src={get_url("summoner_icon",[x[1]])} className="rounded-circle icon img" alt={x[1]}/>{x[0]}</p></div>)})}
                        </div>
                    </div>
                </div>
                <ChampPopUp  trigger={champ_trigger} champ={game.champion} setTrigger={champ_changeTrigger}/>
                <HomePopUp trigger={sum_trigger} setTrigger={sum_changeTrigger} summoner={summonerName_popup} region={props.region}/>
            </>
        );
    }
};

const Kill = (props) =>{
    const game = props.game;
    if(game.triplekill){
        return <span className="kill">Triplekill</span>;
    }else if(game.quatrakill){
        return <span className="kill">Quatrakill</span>;
    }else if(game.pentakill){
        return <span className="kill">Pentakill</span>;
    }else{
        return "";
    }
}
//team 200 read side
//team 100 blue side

export default Match;