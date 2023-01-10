import {api_key} from "./key";

const language = {
    "CZECH":"cs_CZ",
    "GREEK":"el_GR",
    "POLISH":"pl_PL",
    "ROMANIAN":"ro_RO",
    "HUNGARIAN":"hu_HU",
    "GERMAN":"de_DE",
    "ITALIAN":"it_IT",
    "FRENCH":"fr_FR",
    "JAPANESE":"ja_JP",
    "KOREAN":"ko_KR",
    "PORTUGUESE":"pt_BR",
    "RUSSIAN":"ru_RU",
    "TURKISH":"tr_TR",
    "MALAY":"Ms_MY",
    "THAI":"TH_TH",
    "VIETNAMESE":"vn_VN",
    "INDONESIAN":"id_ID",
    "ENGLISH_UK":"en_GB",
    "ENGLISH_AU":"en_AU",
    "ENGLISH_PH":"en_PH",
    "ENGLISH_SG":"en_SG",
    "ENGLISH":"en_US",
    "CHINESE_MY":"zh_MY",
    "CHINESE_CN":"zh_CN",
    "CHINESE_TW":"zh_TW",
    "SPANISH_MX":"es_MX",
    "SPANISH_AR":"es_AR",
    "SPANISH":"es_ES",
}
const prefix = {
    ddragon:"http://ddragon.leagueoflegends.com/cdn/",
}
const main = {
    "icon" : [prefix.ddragon,0,"/img/champion/",2],
    "spell" : [prefix.ddragon,0,"/img/spell/",2],
    "passiv" : [prefix.ddragon,0,"/img/passive/",2],
    "summoner_icon" : [prefix.ddragon,0,"/img/profileicon/",2,".png"],
    "items" : [prefix.ddragon,0,"/img/item/",2],
    "map" : [prefix.ddragon,"6.8.1/img/map/map",2,".png"], //no version
    "splash" : [prefix.ddragon,"img/champion/splash/",2,"_",3,".jpg"], //no version

    "items_json" : [prefix.ddragon,0,"/data/",1,"/item.json"], //with language (default en_US)
    "champ" : [prefix.ddragon,0,"/data/",1,"/champion/",2,".json"],
    "champions" : [prefix.ddragon,0,"/data/",1,"/champion.json"],

    "queueID" : ["https://static.developer.riotgames.com/docs/lol/queues.json"],
    "version" : ["https://ddragon.leagueoflegends.com/api/versions.json"],
    "map_json" : ["https://static.developer.riotgames.com/docs/lol/maps.json"],
}

export function get_url(typ, add, lang){
    let url="";
    let stop = false;
    for(const thing of main[typ]){
        switch (thing){
            case 0:
                try{
                    url += localStorage.getItem('version');
                }catch (e) {
                    url += "12.21.1";
                }
                break;
            case 1:
                if(lang===undefined){
                    url += "en_US";
                }else{
                    url += language[lang.toUpperCase()];
                }
                break;
            case 2:
                if(add[0]){
                    url += add[0];
                }else{
                    stop=true;
                }
                break;
            case 3:
                if(add[1].toString()){
                    url += add[1].toString();
                }else{
                    stop=true;
                }
                break;
            default:
                url += thing;
                break;
        }
        if(stop){
            url=undefined;
            break;
        }
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