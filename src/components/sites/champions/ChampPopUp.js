import React, {useEffect, useState} from 'react';
import lightOrDarkImage from '@check-light-or-dark/image';
import UseFetch from "../../../hooks/useFetch";
import SpellDescription from "./SpellDescription";
import Graph from "./Graph";
import {get_url} from "../../../other/js/links";
import './css/ChampsPopUp.css'
import '../../css/PopUp.css'

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
    const url = get_url("champ", [props.champ]);
    const {data, loading} = UseFetch(url);
    const [spellName, changeSpellName] = useState("");
    const [spellDesc, changeSpellDesc] = useState("");
    const [spellTooltip, changeSpellTooltip] = useState("");
    const [light, changeLight] = useState(null);

    let champion = props.champ;
    if (data) champion = Object.values(data?.data)[0];

    useEffect(() => {
        lightOrDarkImage({
            image: get_url("splash",[champion.id,0]),
        }).then(res => {
            changeLight(res);
        });
    }, [get_url("splash",[champion.id,0])]);

    if(props.trigger && data){
        return(
            <div className="popup">
                <div className="popup-inner champ_height_popup">
                    <div>
                        <button className="close-btn" onClick={() => {props.setTrigger(false);changeSpellDesc(" ");changeSpellName(" ");changeSpellTooltip(null); changeLight(null);}}>close</button>
                    </div>
                    <div>
                        <div>
                            <img className={"main_img"} alt={"splash_"+champion.id} src={get_url("splash",[champion.id,0])}/>
                            <h2 className={"main_title " + (light+"_title")}>{champion.name}</h2>
                            <h3 className={"main_undertitle " + (light+"_title")}>{champion.title}</h3>
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
                                        return(<div className="col-4" key={i} onClick={()=>{changeSpellName(x.name);changeSpellDesc(<img src={get_url("splash", [champion.id,x.num])} className="skin_big" alt={x.name}/>);changeSpellTooltip(null)}}><img src={get_url("splash", [champion.id,x.num])} className="skin" alt={x.name}/></div>);
                                    })}
                                </div>
                            </div>
                            <div className="col-6 ">
                                <div className="stretch_div">
                                    <button className="show_btn"
                                            onClick={() => {changeSpellName("Stats");changeSpellDesc(
                                                <Graph data={graph_data(champion)}/>
                                            );changeSpellTooltip(null);}}>
                                       Stats
                                    </button>
                                    <button className="show_btn"
                                            onClick={() => {changeSpellName("");changeSpellDesc(
                                                <table>
                                                    <tbody>
                                                    <tr><td><strong>Ally Tips</strong></td></tr>
                                                    {champion.allytips.map((x,i)=>{return(<tr key={i}><td>{x}<hr/></td></tr>);})}
                                                    <tr><td><strong>Enemy Tips</strong></td></tr>
                                                    {champion.enemytips.map((x,i)=>{return(<tr key={i}><td>{x}<hr/></td></tr>);})}
                                                    </tbody>
                                                </table>
                                            );changeSpellTooltip(null);}}>
                                        Tips
                                    </button>
                                </div>
                                <div className="stretch_div">
                                    <img className="spell" alt={"spell_"+champion.passive.image.full} src={get_url("passiv", [champion.passive.image.full])} onClick={() => {changeSpellName(champion.passive.name);changeSpellDesc(champion.passive.description);changeSpellTooltip(null);changeSpellTooltip(champion.passive.tooltip)}}/>
                                    {champion.spells.map((x,i) => {
                                        return(
                                            <img key={i+"_spell"} className="spell" alt={"spell_"+x.image.full} src={get_url("spell", [x.image.full])} onClick={() => {changeSpellName(x.name);changeSpellDesc(x.description);changeSpellTooltip(null);changeSpellTooltip(x.tooltip)}}/>
                                        );
                                    })}
                                </div>
                                <div className="stretch_div">
                                    <div>
                                        <SpellDescription name={spellName} desc={spellDesc} tooltip={spellTooltip}/>
                                    </div>
                                </div>
                            </div>
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
                    <button className="close-btn" onClick={() => {props.setTrigger(false);changeSpellDesc(" ");changeSpellName(" ");changeSpellTooltip(null);changeLight(null);}}>close</button>
                    <h3>Champion</h3>
                </div>
                <div>
                    {champion}
                </div>
            </div>
        </div>
        );
    }
    else{
        return "";
    }
};

export default ChampPopUp;