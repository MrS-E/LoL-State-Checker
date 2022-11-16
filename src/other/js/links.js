import {api_key} from "./key";
//JSON
const version = "https://ddragon.leagueoflegends.com/api/versions.json";
get_version();
export let champions = "http://ddragon.leagueoflegends.com/cdn/12.17.1/data/en_US/champion.json";
export let champ = "http://ddragon.leagueoflegends.com/cdn/12.17.1/data/en_US/champion/";
export let items_json = "http://ddragon.leagueoflegends.com/cdn/12.22.1/data/en_US/item.json";
export const queueID = "https://static.developer.riotgames.com/docs/lol/queues.json";

function get_version(){ //TODO make it nicer with arrays and sub-urls
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function() {
        let ver = this.responseText.split("\",\"");
        ver = ver[0].split("[\"")[1];
        champions = "http://ddragon.leagueoflegends.com/cdn/" + ver + "/data/en_US/champion.json";
        champ = "http://ddragon.leagueoflegends.com/cdn/" + ver + "/data/en_US/champion/";
        icon = "http://ddragon.leagueoflegends.com/cdn/" + ver + "/img/champion/";
        spell = "http://ddragon.leagueoflegends.com/cdn/" + ver + "/img/spell/";
        passiv = "http://ddragon.leagueoflegends.com/cdn/" + ver + "/img/passive/";
        summoner_icon = "http://ddragon.leagueoflegends.com/cdn/" + ver + "/img/profileicon/";
        items = "http://ddragon.leagueoflegends.com/cdn/" + ver + "/img/item/";
        items_json = "http://ddragon.leagueoflegends.com/cdn/"+ver+"/data/en_US/item.json";
    }
    xmlhttp.open("GET",  version);
    xmlhttp.send();
}

//TODO function for nicer link generation not just import (more like api)

// Images
export const splash = "http://ddragon.leagueoflegends.com/cdn/img/champion/splash/";
export let icon = "http://ddragon.leagueoflegends.com/cdn/12.17.1/img/champion/";
export let spell = "http://ddragon.leagueoflegends.com/cdn/12.17.1/img/spell/";
export let passiv = "http://ddragon.leagueoflegends.com/cdn/12.17.1/img/passive/";
export let summoner_icon = "http://ddragon.leagueoflegends.com/cdn/12.17.1/img/profileicon/";
export let items = "http://ddragon.leagueoflegends.com/cdn/12.21.1/img/item/";
export const map="http://ddragon.leagueoflegends.com/cdn/6.8.1/img/map/";

//API
const routing_platform = {
    "BR1":"br1.api.riotgames.com", // Brazil
    "EUN1":"eun1.api.riotgames.com", //EU Nordic & East
    "EUW1":"euw1.api.riotgames.com", //EU West
    "JP1":"jp1.api.riotgames.com", //Japan
    "KR":"kr.api.riotgames.com", //Korea
    "LA1":"la1.api.riotgames.com", //Latin America (maybe North)
    "LA2":"la2.api.riotgames.com", //Latin America (maybe South)
    "NA1":"na1.api.riotgames.com", //North America
    "OC1":"oc1.api.riotgames.com", //Oceania (Australia, New Zealand)
    "TR1":"tr1.api.riotgames.com", //Turkey
    "RU":"ru.api.riotgames.com" //Russia
};
const routing_region={
    "AMERICAS":"americas.api.riotgames.com", //BR1, LA1, LA2, NA1,
    "ASIA":"asia.api.riotgames.com", // JP1, KR
    "EUROPE":"europe.api.riotgames.com", //EUN1, EUW1, TR1, RU
    "SEA":"sea.api.riotgames.com" //OC1
};
const querys={
    "key":"api_key="
};
const urls = {
    "summoner_by_name":["/lol/summoner/v4/summoners/by-name/",0,"?"],
    "match_ids_by_puuid":["/lol/match/v5/matches/by-puuid/",0,"/ids?start=",1,"&count=",2,"&"],
    "match_by_id":["/lol/match/v5/matches/",0,"?"]
};

export function get_request(get, routing, routing_typ, needed, typ){
    let url = "https://";
    switch (routing_typ){
        case "region":
             url += routing_region[routing];
            break;
        case "platform":
            url += routing_platform[routing];
            break;
        default:
            return "";
    }
    if(urls[get].length<2){
        url += urls[get][0];
    }else if(urls[get].length===2){
        url += urls[get][0];
        url += needed[0];
    }else if(urls[get].length>2){
        for(let x=0; x<urls[get].length;x++){
            if(typeof urls[get][x] == "number"){
                url+=needed[urls[get][x]];
            }else{
                url+=urls[get][x];
            }
        }
    }
    switch (typ){
        case "query":
            url += querys.key;
            url += api_key;
            break;
        case "header":
            return ""; //TODO parsing the KEY by header ->  https://stackoverflow.com/questions/34319709/how-to-send-an-http-request-with-a-header-parameter
        default:
            return "";
    }
    return url;
}

export function get_region_from_platform(platform){
    switch (platform){
        case"BR1":
            return"AMERICAS";
        case"LA1":
            return"AMERICAS";
        case"LA2":
            return"AMERICAS";
        case"NA1":
            return"AMERICAS";
        case"JP1":
            return"ASIA";
        case"KR":
            return"ASIA";
        case"EUW1":
            return"EUROPE";
        case"EUN1":
            return"EUROPE";
        case"TR1":
            return"EUROPE";
        case"RU":
            return"EUROPE";
        case"OC1":
            return"SEA";
        default:
            return"EUROPE";
    }
}