//JSON
const version = "https://ddragon.leagueoflegends.com/api/versions.json";
get_version();
export let champions = "http://ddragon.leagueoflegends.com/cdn/12.17.1/data/en_US/champion.json";
export let champ = "http://ddragon.leagueoflegends.com/cdn/12.17.1/data/en_US/champion/";

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
    }
    xmlhttp.open("GET",  version);
    xmlhttp.send();
}

function link(typ, id){
    //TODO function for nicer link generation not just import (more like api)
}

// Images
export const splash = "http://ddragon.leagueoflegends.com/cdn/img/champion/splash/";
export let icon = "http://ddragon.leagueoflegends.com/cdn/12.17.1/img/champion/";
export let spell = "http://ddragon.leagueoflegends.com/cdn/12.17.1/img/spell/";
export let passiv = "http://ddragon.leagueoflegends.com/cdn/12.17.1/img/passive/";
export let summoner_icon = "http://ddragon.leagueoflegends.com/cdn/12.17.1/img/profileicon/";

//API
const api_key = "RGAPI-31a604c2-66e3-4239-b8ec-00e6acb01ac2";
const routing_platform = {
    "BR1":"br1.api.riotgames.com",
    "EUN1":"eun1.api.riotgames.com",
    "EUW1":"euw1.api.riotgames.com",
    "JP1":"jp1.api.riotgames.com",
    "KR":"kr.api.riotgames.com",
    "LA1":"la1.api.riotgames.com",
    "LA2":"la2.api.riotgames.com",
    "NA1":"na1.api.riotgames.com",
    "OC1":"oc1.api.riotgames.com",
    "TR1":"tr1.api.riotgames.com",
    "RU":"ru.api.riotgames.com"
};
const routing_region={
    "AMERICAS":"americas.api.riotgames.com",
    "ASIA":"asia.api.riotgames.com",
    "EUROPE":"europe.api.riotgames.com",
    "SEA":"sea.api.riotgames.com"
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
             url += routing_region[routing] ;
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
};
