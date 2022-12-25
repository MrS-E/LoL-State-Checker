import React, {useEffect, useRef, useState} from 'react';
import {random} from "../Quitz";
import {get_url} from "../../../../other/js/links";
import "../css/QuitzChampionSplash.css"

function QuitzChampionSplash(props) {
    const ans = useRef(null);
    const champs = JSON.parse(localStorage.getItem('champions'));
    const [champion, changeChampion] = useState(null);
    const [all_champs, addAllChamps] = useState([]);
    const [img, changeImg] = useState(null);

    useEffect(()=>{
        select_champ(champs).then(([champ, img, ch])=>{
            changeChampion(champ);
            changeImg(img);
            addAllChamps(ch);
        })
    }, [props.output])

    const handleClick = () => {
        if(ans.current.value === champion){
            props.changeOutput(oldArray => [[ans.current.value, img, champion, "skin", true], ...oldArray]);
        }else{
            props.changeOutput(oldArray => [[ans.current.value, img, champion, "skin", false], ...oldArray]);
        }
        ans.current.value = "";
    }

    return(
        <div className={"champion_quiz"}>
            <img className={"champion_quitz_image"} src={img} alt={champion}/>
            <div className={"champion_quitz_input"}>
                <input type="text" ref={ans} list={"list"}/>
                <button className={"champion_quitz_btn"} onClick={handleClick}>Check</button>
                <datalist id={"list"}>
                    {all_champs.map((d, key)=>{
                        return(<option key={key} value={d}>{d}</option>);
                    })}
                </datalist>
            </div>
        </div>
    );
}



async function select_champ(champs){
    if(champs !== undefined) {
        champs = champs.data
        const champion = Object.keys(champs)[random(Object.keys(champs).length,0)];
        const img = get_url("splash",(champion+"_0.jpg"));
        return [champion, img, Object.keys(champs)];
    }else{
        return ["","", []];
    }
}

export default QuitzChampionSplash;