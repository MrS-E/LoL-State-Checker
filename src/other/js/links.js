import {api_key} from "./key";

const language = {}
const prefix = {
    ddragon:"http://ddragon.leagueoflegends.com/cdn/",
}
const main = {
    "icon" : [prefix.ddragon,0,"/img/champion/"],
    "spell" : [prefix.ddragon,0,"/img/spell/"],
    "passiv" : [prefix.ddragon,0,"/img/passive/"],
    "summoner_icon" : [prefix.ddragon,0,"/img/profileicon/"],
    "items" : [prefix.ddragon,0,"/img/item/"],
    "map" : [prefix.ddragon,"6.8.1/img/map/"], //no version
    "splash" : [prefix.ddragon,"img/champion/splash/"], //no version

    "items_json" : [prefix.ddragon,0,"/data/",0,"/item.json"], //with language (default en_US)
    "champ" : [prefix.ddragon,0,"/data/",0,"/champion/"],
    "champions" : [prefix.ddragon,0,"/data/",0,"/champion.json"],

    "queueID" : ["https://static.developer.riotgames.com/docs/lol/queues.json"],
    "version" : ["https://ddragon.leagueoflegends.com/api/versions.json"],
    "map_json" : ["https://static.developer.riotgames.com/docs/lol/maps.json"],
}

export function get_url(typ,add,lang){
    let url="";
    const length = main[typ].length;
    url += main[typ][0];
    if(length===2){
        url += main[typ][1];
    }
    if(length>=3){
        try{
            url += localStorage.getItem('version');
        }catch (e) {
            url += "12.21.1";
        }
        url += main[typ][2];
    }
    if(length>=5){
        if(main[typ][3]===0){
            if(lang===undefined){
                url += "en_US";
            }else{
                url += language[lang];
            }
        }
        url+=main[typ][4];
    }
    if(add!==undefined){
        url += add;
    }
    return url;
}

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
            return "";
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