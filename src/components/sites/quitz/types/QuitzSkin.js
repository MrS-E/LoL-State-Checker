import React, {useEffect, useRef, useState} from 'react';
import {random} from "../Quitz";
import {get_url} from "../../../../other/js/links";
import axios from "axios";
import "../css/QuitzSkin.css"

function QuitzSkin(props) {
    const ans = useRef(null);
    const champs = JSON.parse(localStorage.getItem('champions'));
    const [skin, changeSkin] = useState(null);
    const [all_skins, addAllSkins] = useState([]);
    const [img, changeImg] = useState(null);
    all_skins_select(champs).then((skinis)=>{
        addAllSkins(skinis);
    });

    useEffect(()=>{
        select_skin(champs).then(([skin, img])=>{
            changeSkin(skin);
            changeImg(img);
        })
    }, [props.output])

    const handleClick = () => {
        if(ans.current.value === skin){
            props.changeOutput(oldArray => [[ans.current.value, img, skin, "skin", true], ...oldArray]);
        }else{
            props.changeOutput(oldArray => [[ans.current.value, img, skin, "skin", false], ...oldArray]);
        }
        ans.current.value = "";
    }

    return(
        <div className={"skin_quiz"}>
            <img className={"skin_quitz_image"} src={img} alt={skin}/>
            <div className={"skin_quitz_input"}>
                <input type="text" ref={ans} list={"list"}/>
                <button className={"skin_quitz_btn"} onClick={handleClick}>Check</button>
                <datalist id={"list"}>
                    {all_skins.map((d, key)=>{
                        return(<option key={key} value={d}>{d}</option>);
                    })}
                </datalist>
            </div>
        </div>
    );
}

async function all_skins_select(champs){
    if(champs !== undefined) {
        let skins = []
        for (const d of Object.keys(champs.data)) {
            await axios.get(get_url("champ", d + ".json")).then(
                (res) => {
                    for (const x of res.data.data[d].skins){
                        if(x.name!=="default"){
                            skins.push(x.name);
                        }
                    }
                }
            )
        }
        return skins;
    }else{
        return [];
    }
}

async function select_skin(champs){
    if(champs !== undefined) {
        const champion = await axios.get(get_url("champ", (Object.keys(champs.data)[random(Object.keys(champs.data).length - 1, 0)] + ".json"))).then(
            (res) => {
                return res.data.data;
            }
        )
        const skin = champion[Object.keys(champion)[0]].skins[random(champion[Object.keys(champion)[0]].skins.length-2,1)];
        const img = get_url("splash", (Object.keys(champion)[0]+"_"+skin.num+".jpg"));
        const skin_name = skin.name;
        return([skin_name, img]);
    }
}

export default QuitzSkin;