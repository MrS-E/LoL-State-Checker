import React, {useState} from 'react';
import UseFetch from "../../../hooks/useFetch";
import './css/ChampsPopUp.css'
import '../../../other/css/PopUp.css'
import {champ} from "../../../other/js/links";
import {splash} from "../../../other/js/links";
import {passiv} from "../../../other/js/links";
import {spell} from "../../../other/js/links";
import SpellDescription from "./SpellDescription";
import Graph from "./Graph";

const graph_data = (data) => {
    const stats = data.stats;
    let output = {
        labels: [],
        datasets:[
            {
                label: 'HP',
                data: [],
                borderColor: '#4437d4',
            },
            {
                label: 'HP Regen.',
                data: [],
                borderColor: '#41d437',
            },
            {
                label: 'Mana',
                data: [],
                borderColor: '#dede3a',
            },
            {
                label: 'Mana Regen.',
                data: [],
                borderColor: '#de3ad3',
            },
            {
                label: 'Armor',
                data: [],
                borderColor: '#e31212',
            },
            {
                label: 'Damage',
                data: [],
                borderColor: '#12e3e3',
            },
            {
                label: 'Attackspeed',
                data: [],
                borderColor: '#e39312',
            },
            {
                label: 'Movement',
                data: [],
                borderColor: '#000000',
            },
            {
                label: 'Crit',
                data: [],
                borderColor: '#5e5648',
            },
            {
                label: 'Spellblock',
                data: [],
                borderColor: '#66458c',
            }
        ]
    }

    for(let x=0;x<18;x++){
        output.labels.push(x+1);
        output.datasets[0].data.push(stats.hp+(stats.hpperlevel*x));
        output.datasets[1].data.push(stats.hpregen+(stats.hpregenperlevel*x));
        output.datasets[2].data.push(stats.mp+(stats.mpperlevel*x));
        output.datasets[3].data.push(stats.mpregen+(stats.mpregenperlevel*x));
        output.datasets[4].data.push(stats.armor+(stats.armorperlevel*x));
        output.datasets[5].data.push(stats.attackdamage+(stats.attackdamageperlevel*x));
        output.datasets[6].data.push(stats.attackspeed+(stats.attackspeedperlevel*x));
        output.datasets[7].data.push(stats.movespeed);
        output.datasets[8].data.push(stats.crit+(stats.critperlevel*x));
        output.datasets[9].data.push(stats.spellblock+(stats.spellblockperlevel*x));
        //console.log(stats.hp, stats.hpregen, stats.mp, stats.mpregen, stats.armor, stats.attackdamage, stats.attackspeed, stats.movespeed, stats.crit, stats.spellblock);
    }

    return output;
}

const ChampPopUp = (props) => {
    const {data, loading} = UseFetch(champ + props.champ + ".json");
    const [spellName, changeSpellName] = useState("");
    const [spellDesc, changeSpellDesc] = useState("");
    let champion = props.champ;
    if (data) champion = Object.values(data?.data)[0];
    if(props.trigger && data){
        return(
            <div className="popup">
                <div className="popup-inner">
                    <div>
                        <button className="close-btn" onClick={() => {props.setTrigger(false);changeSpellDesc(" ");changeSpellName(" ");}}>close</button>
                    </div>
                    <div>
                        <div>
                            <img className="main_img" alt={"splash_"+champion.id} src={splash+champion.id+"_0.jpg"}/>
                            <h2 className="main_title">{champion.name}</h2>
                            <h3 className="main_undertitle">{champion.title}</h3>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <div className="row">
                                    <p className="lore">
                                        {champion.lore}
                                    </p>
                                </div>
                                <div className="row">
                                    {champion.skins.map((x, i) => {
                                        return(<div className="col-4" key={i}><img src={splash+champion.id+"_"+x.num+".jpg"} className="skin" alt={x.name}/><span className="skin_sub">{x.name}</span></div>);
                                    })}
                                </div>
                            </div>
                            <div className="col-6 ">
                                <div className="row stretch_div">
                                    <button className="col-5 show_btn"
                                            onClick={() => {changeSpellName("Stats");changeSpellDesc(
                                                <Graph data={graph_data(champion)}/>
                                            );}}>
                                       Stats
                                    </button>
                                    <button className="col-5 show_btn"
                                            onClick={() => {changeSpellName("");changeSpellDesc(
                                                <table><tbody>
                                                    <tr><td><strong>Ally Tips</strong></td></tr>{champion.allytips.map((x,i)=>{return(<tr key={i}><td>{x}<hr/></td></tr>);})}
                                                    <tr><td><strong>Enemy Tips</strong></td></tr>{champion.enemytips.map((x,i)=>{return(<tr key={i}><td>{x}<hr/></td></tr>);})}
                                                </tbody></table>
                                            );}}>
                                        Tips
                                    </button>
                                </div>
                                <div className="row stretch_div spell_div">
                                    <div className="col-2" onClick={() => {changeSpellName(champion.passive.name);changeSpellDesc(champion.passive.description);}}>
                                        <img className="spell" alt={"spell_"+champion.passive.image.full} src={passiv + champion.passive.image.full}/>
                                    </div>
                                    {champion.spells.map((x,i) => {
                                        return(
                                            <div key={i} className="col-2" onClick={() => {changeSpellName(x.name);changeSpellDesc(x.description);}}>
                                                <img className="spell" alt={"spell_"+x.image.full} src={spell + x.image.full}/>
                                            </div>
                                        );
                                    })}
                                    <div className="row">
                                        <SpellDescription name={spellName} desc={spellDesc}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }else if(props.trigger && loading){
        return(
        <div className="popup">
            <div className="popup-inner">
                <div>
                    <button className="close-btn" onClick={() => {props.setTrigger(false);changeSpellDesc(" ");changeSpellName(" ");}}>close</button>
                    <h3>Champion</h3>
                </div>
                <div>
                    {champion}
                </div>
            </div>
        </div>
        );
    }else{
        return "";
    }
};

export default ChampPopUp;