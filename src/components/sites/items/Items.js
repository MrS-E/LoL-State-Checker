import React, {useEffect, useState} from "react";
import './css/Items.css';
import {get_url} from "../../../other/js/links";
import ItemsPopUp from "./ItemsPopUp";

function Items(){
    const [data, changeData] = useState(undefined);
    const [loading, changeLoading] = useState(false);
    const [typ, changeTyp] = useState(0);
    const [trigger, setTrigger] = useState(false);
    const [item,changeItem] = useState("")
    const [purchasable, setPurchasable] = useState(true);

    useEffect(()=> {
        try {
            changeData(JSON.parse(localStorage.getItem('items')));
        } catch (e) {
            changeLoading(true);
        }
    }, [localStorage.getItem('items')])

    if(loading) return <h1>Loading</h1>;
    if(data) {
        return (
            <>
                <div>
                    <h1>Items Page {data.version}</h1>
                    <hr/>
                    <div className="items_input">
                        Sort by: <br/>
                        <input type="radio" id="tags" value="tags" name="sort" defaultChecked onClick={()=>changeTyp(0)}/>
                        <label>Tags</label>
                        <input type="radio" id="alph" value="alph" name="sort" onClick={()=>changeTyp(1)}/>
                        <label>Alphabet</label>
                        <br/>
                        <input type="checkbox" defaultChecked onClick={() => setPurchasable(previousState => !previousState)}/>
                        <label>only purchasable</label>
                    </div>
                    <div className="items">
                        {
                            gen(typ, data, setTrigger, changeItem, purchasable).map(d=>d)
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

function get_items_by_tags(data, purchasable){
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
    if(purchasable) {
        Object.keys(data.data).forEach((d) => {
            let keys = Object.keys(data.data[d])
            if (!keys.includes("requiredChampion") && !keys.includes("requiredAlly") && !keys.includes("inStore")) {
                data.data[d].tags.forEach((tag) => {
                    items_by_tag[tag].push(d);
                })
            }
        })
    }else{
        Object.keys(data.data).forEach((d)=>{
            let keys = Object.keys(data.data[d])
            if (!keys.includes("requiredChampion") && !keys.includes("requiredAlly")) {
                data.data[d].tags.forEach((tag) => {
                    items_by_tag[tag].push(d);
                })
            }
        })
    }
    Object.keys(items_by_tag).forEach(t=>{
        items_by_tag[t] = [...new Set(items_by_tag[t])];
    })

    return items_by_tag;
}

function get_items_by_letter(data, purchasable){
    const items={
    };
    let items_temp=[];
    if(purchasable) {
        Object.keys(data.data).forEach((d) => {
            if (!Object.keys(data.data[d]).includes("requiredChampion") && !Object.keys(data.data[d]).includes("requiredAlly") && !Object.keys(data.data[d]).includes("inStore")) {
                items_temp.push([data.data[d].name, d]);
            }
        })
    }else{
        Object.keys(data.data).forEach((d) => {
            if (!Object.keys(data.data[d]).includes("requiredChampion") && !Object.keys(data.data[d]).includes("requiredAlly")) {
                items_temp.push([data.data[d].name, d]);
            }
        })
    }
    items_temp =  [...new Set(items_temp.sort((a,b)=>{
        if(a[0]<b[0]){
            return -1;
        }else if(b[0]<a[0]){
            return 1;
        }else{
            return 0;
        }
    }))]
    items_temp.forEach((d)=>{
        if(Object.keys(items).includes(d[0][0])){
            items[d[0][0]].push(d[1])
        }else{
            items[d[0][0]] = [];
            items[d[0][0]].push(d[1])
        }
    });

    return items;
}

function gen(typ, data, setTrigger, changeItem, purchasable){
    let item;
    let output = [];
    if (typ === 0) {
        item = get_items_by_tags(data, purchasable);
    } else if (typ === 1) {
        item = get_items_by_letter(data, purchasable);
    }

    Object.keys(item).sort().forEach((d, key) => {
        let split = d.search(/.[A-Z]/g)<0 ? 0 : d.search(/.[A-Z]/g)+1;
        output.push(<div key={key+"_item"}><h6>{d.splice(split,0," ")}</h6>{item[d].map((x, key)=>{return(<img key={key} onClick={()=>{setTrigger(true); changeItem(x);}} className="item_img" src={get_url("items",[data.data[x].image.full])} alt={data.data[x].name +" "+ x}/>);})}</div>);
    });
    return output
}

String.prototype.splice = function(idx, rem, str) {
    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem)); //gefunden auf https://stackoverflow.com/questions/4313841/insert-a-string-at-a-specific-index
};

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
        let uniq = [...new Set(i)];
    }
* */
