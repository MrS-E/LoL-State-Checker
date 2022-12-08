import React, {useEffect, useRef, useState} from 'react';
import {random} from "../Quitz";
import {get_url} from "../../../../other/js/links";
import axios from "axios";

function QuitzSkin(props) {
    const ans = useRef(null);
    const champs = JSON.parse(localStorage.getItem('champions'));
    const [skin, changeSkin] = useState(null);
    const [id, changeId] = useState(null);
    const [img, changeImg] = useState(null);

    useEffect(()=>{
        select_skin(champs).then(({skin, img, id})=>{
            changeSkin(skin);
            changeImg(img);
            changeId(id)
        })
    }, [props.output])

    const handleClick = () => {
        console.log(ans.current.value);
        if(ans.current.value === skin){
            props.changeOutput(oldArray => [[ans.current.value, img, skin, id, true], ...oldArray]);
        }else{
            props.changeOutput(oldArray => [[ans.current.value, img, skin, id, false], ...oldArray]);
        }
    }

    return(
        <div>
            <img src={img} alt={skin}/>
            <div>
                <input type="text" ref={ans}/>
                <button onClick={handleClick}>Check</button>
            </div>
        </div>
    );
}

async function select_skin(champs){
    if(champs !== undefined) {
        const champion = await axios.get(get_url("champ", (Object.keys(champs.data)[random(Object.keys(champs.data).length - 1, 0)] + ".json"))).then(
            (res) => {
                //console.log(res.data.data)
                return res.data.data;
            }
        )
        console.log(Object.keys(champion)[0]);
        const skin = champion[Object.keys(champion)[0]].skins[random(champion[Object.keys(champion)[0]].skins.length-2,1)];
        console.log(skin);
        const img = get_url("splash", (Object.keys(champion)[0]+"_"+skin.num+".jpg"));
        console.log(img);
        const skin_name = skin.name;
        const skin_id = skin.id;
        return({skin_name, img, skin_id});
    }
}

export default QuitzSkin;