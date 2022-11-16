import React from "react";
import './css/Items.css';
import useFetch from "../../../hooks/useFetch";
/*
* TODO Plan: Items with Images sortable after group/tags/alphabetical clickable like champions with detail view
* */
function Items(){
    const {data, loading} = useFetch("http://ddragon.leagueoflegends.com/cdn/12.22.1/data/en_US/item.json");
    let i = []
    if(data) {
        Object.values(data.data).forEach((d) => {
            d.tags.forEach(d => i.push(d))
        })
        console.log(i);
        let uniq = [...new Set(i)];
        console.log(uniq);
    }
    return (
        <>
            <h1>Items Page</h1>
        </>
    );
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
* */
