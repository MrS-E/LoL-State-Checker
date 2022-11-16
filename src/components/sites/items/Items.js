import React from "react";
import './css/Items.css';
import useFetch from "../../../hooks/useFetch";
import {items_json} from "../../../other/js/links";
/*
* TODO Plan: Items with Images sortable after tags/alphabetical clickable like champions with detail view
*/
function Items(){
    const {data, loading} = useFetch(items_json);
    if(loading) return <h1>Loading</h1>;
    if(data) {
        return (
            <div>
                <h1>Items Page {data.version}</h1>
                <hr/>
                <input type="radio" id="tags" value="tags" checked/>
                    <input type="radio" id="alph" value="alph"/>
                <div>

                </div>
            </div>
        );
    }else{
        return '';
    }
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
