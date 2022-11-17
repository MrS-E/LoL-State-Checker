import React, {useState} from "react";
import './css/Items.css';
import useFetch from "../../../hooks/useFetch";
import {items, items_json} from "../../../other/js/links";
import ItemsPopUp from "./ItemsPopUp";
/*
* TODO Plan: Items with Images sortable after tags/alphabetical clickable like champions with detail view
*/


function Items(){
    const {data, loading} = useFetch(items_json);
    const [typ, changeTyp] = useState(0);
    const [trigger, setTrigger] = useState(false);
    const [item,changeItem] = useState("")
    if(loading) return <h1>Loading</h1>;
    if(data) {


        return (
            <>
                <div>
                    <h1>Items Page {data.version}</h1>
                    <hr/>
                    <div>
                        Sort by:
                        <input type="radio" id="tags" value="tags" name="sort" defaultChecked onClick={()=>changeTyp(0)}/>
                        <label>Tags</label>
                        <input type="radio" id="alph" value="alph" name="sort" onClick={()=>changeTyp(1)}/>
                        <label>Alphabet</label>
                    </div>
                    <div className="items">
                        {
                            gen(typ, data, setTrigger, changeItem).map(d=>d)
                        }
                    </div>
                </div>
                <ItemsPopUp trigger={trigger} setTrigger={setTrigger} data={data} item={item}/>
            </>
        );
    }else{
        return '';
    }
}

function get_items_by_tags(data){
    const items_by_tag = {
        Boots: [],
        ManaRegen: [],
        HealthRegen: [],
        Health: [],
        CriticalStrike: [],
        SpellDamage: [],
        Mana: [],
        Armor: [],
        SpellBlock: [],
        LifeSteal: [],
        SpellVamp: [],
        Jungle: [],
        Damage: [],
        Lane: [],
        AttackSpeed: [],
        OnHit: [],
        Trinket: [],
        Active: [],
        Consumable: [],
        Stealth: [],
        Vision: [],
        CooldownReduction: [],
        NonbootsMovement: [],
        AbilityHaste: [],
        Tenacity: [],
        MagicPenetration: [],
        ArmorPenetration: [],
        Aura: [],
        Slow: [],
        GoldPer: [],
        MagicResist: [],
    }
    Object.keys(data.data).forEach((d)=>{
        data.data[d].tags.forEach((tag)=>{
            items_by_tag[tag].push(d);
        })
    })
    Object.keys(items_by_tag).forEach(t=>{
        items_by_tag[t] = [...new Set(items_by_tag[t])];
    })

    return items_by_tag;
}

function get_items_by_letter(data){
    const items={
        items: []
    };
    Object.keys(data.data).forEach((d)=>{
        items.items.push([data.data[d].name, d]);
    })
    items.items =  [...new Set(items.items.sort((a,b)=>{
        if(a[0]<b[0]){
            return -1;
        }else if(b[0]<a[0]){
            return 1;
        }else{
            return 0;
        }
    }))]
    return items;
} //FIXME alphabet does not work

function gen(typ, data, setTrigger, changeItem){
    let item;
    let output = [];
    if (typ === 0) {
        item = get_items_by_tags(data);
    } else if (typ === 1) {
        item = get_items_by_letter(data);
    }

    Object.keys(item).sort().forEach((d, key) => {
        output.push(<div key={key+"_item"}><h6>{d}</h6>{item[d].map((x)=>{return(<img onClick={()=>{setTrigger(true); changeItem(x);}} className="item_img" src={items+data.data[x].image.full} alt={data.data[x].name +" "+ x}/>);})}</div>);
    });
    return output
}

export default Items;

/*
Tags;
"Boots"
"ManaRegen"
"HealthRegen"
"Health"
"CriticalStrike"
"SpellDamage"
"Mana"
"Armor"
"SpellBlock"
"LifeSteal"
"SpellVamp"
"Jungle"
"Damage"
"Lane"
"AttackSpeed"
"OnHit"
"Trinket"
"Active"
"Consumable"
"Stealth"
"Vision"
"CooldownReduction"
"NonbootsMovement"
"AbilityHaste"
"Tenacity"
"MagicPenetration"
"ArmorPenetration"
"Aura"
"Slow"
"GoldPer"
"MagicResist"


mit:

    if(data) {
        let i = []
        Object.values(data.data).forEach((d) => {
            d.tags.forEach(d => i.push(d))
        })
        console.log(i);
        let uniq = [...new Set(i)];
        console.log(uniq);
    }
* */
