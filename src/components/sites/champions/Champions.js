import React, {useState} from "react"
import UseFetch from "../../../hooks/useFetch";
import './css/Champions.css'
import ChampPopUp from "./ChampPopUp";
import {get_url} from "../../../other/js/links";

function Champions() {
    const [trigger, changeTrigger] = useState(false);
    const [champion, changeChamp] = useState("");
    const url = get_url("champions");
    console.log(url);
    const {data, loading} = UseFetch(url); //TODO push fetching of json files to stored values.
    if (loading) return <h1>Loading</h1>;
    if(data!=null){
    return(
        <>
            <h1>Champions {data?.version}</h1>
            <hr/>
            <div className="row">
                {Object.values(data?.data).map((data, i)=>{
                    return(
                        <div key={i} id={data.key} className="col-1" onClick={() => {changeTrigger(true);changeChamp(data.id);}}>
                            <img className="col-12"  src={get_url("icon",data.image.full)} alt={data.name}/>
                            <p>{data.name}</p>
                        </div>
                    );
                })}
            </div>
            <ChampPopUp trigger={trigger} champ={champion} setTrigger={changeTrigger}/>
        </>
    );}
}


export default Champions;
