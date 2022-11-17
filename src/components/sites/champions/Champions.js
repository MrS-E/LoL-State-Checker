import React, {useEffect, useState} from "react"
import './css/Champions.css'
import ChampPopUp from "./ChampPopUp";
import {get_url} from "../../../other/js/links";

function Champions() {
    const [trigger, changeTrigger] = useState(false);
    const [champion, changeChamp] = useState("");
    const [data, changeData] = useState(undefined);
    const [loading, changeLoading] = useState(false);
    useEffect(()=> {
        try {
            changeData(JSON.parse(localStorage.getItem('champions')));
        } catch (e) {
            changeLoading(true);
        }
    }, [localStorage.getItem('champions')])
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
