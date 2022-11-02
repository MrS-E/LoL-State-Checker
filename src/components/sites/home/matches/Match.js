import React from 'react';
import {get_request} from "../../../other/links";
import useFetch from "../../../hooks/useFetch";
import '../css/Match.css'
import {summoner_icon} from "../../../other/links";

const Match = (props) => {
    const url = get_request("match_by_id",props.region,"region",[props.id],"query");
    const {data,loading,error} = useFetch(url);
    if (error) console.log(error);
    if (loading) return <h6>Loading</h6>;
    if(data) {
        let summoner_blue=[];
        let summoner_red=[];
        for(let x=0;x<data.info.participants.length;x++){
            if(x<5){
                summoner_blue.push([data["info"]["participants"][x]["summonerName"],data["info"]["participants"][x]["profileIcon"]]);
            }else if(x<10){
                summoner_red.push([data["info"]["participants"][x]["summonerName"],data["info"]["participants"][x]["profileIcon"]]);
            }
        }
        let className = "c100";
        if(data["info"]["teams"]["1"]["win"]===true){
            className="c200"
        }
        return (
            <div className={className + " games"} id={props.id}>
                <div>
                    <h6>{data.info.gameMode}</h6>
                    {props.id}
                </div>
                <div className="summoner">
                    <div className="sum_blue">
                        {summoner_blue.map((x)=>{return(<p className="sum"><img src={summoner_icon+x[1]+".png"} className="rounded-circle icon img" alt={x[1]}/>{x[0]}</p>)})}
                    </div>
                    <div className="sum_red">
                        {summoner_red.map((x)=>{return(<p className="sum"><img src={summoner_icon+x[1]+".png"} className="rounded-circle icon img" alt={x[1]}/>{x[0]}</p>)})}
                    </div>
                </div>
            </div>
        );
    }
};
//team 200 read side
//team 100 blue side

export default Match;