import axios from "axios";
import {get_url as urls} from "./links";


export function run_local(){
    /*localStorage.removeItem('version');
    localStorage.removeItem('champion');
    localStorage.removeItem('items_json');
    localStorage.removeItem('queueID');
    localStorage.removeItem('maps');*/
    get_version().then(()=>{
        get_queueIDs().then(()=>{
            get_items().then(()=>{
                get_champions().then(()=>{
                    get_map().then(()=> {
                        console.log("loaded to localStorage")
                    })
                })
            })
        })
    });
}

async function get_version(){
    const version = await get_url(urls("version"));
    localStorage.setItem('version', version[0] );
}

async function get_champions(){
    const champion = await get_url(urls("champions"));
    localStorage.setItem('champions', JSON.stringify(champion));
}

async function get_items(){
    const item = await get_url(urls("items_json"));
    localStorage.setItem('items', JSON.stringify(item));
}

async function get_queueIDs(){
    const queues = await get_url(urls("queueID"));
    localStorage.setItem('queues', JSON.stringify(queues));
}

async function get_map(){
    const maps = await get_url(urls("map_json"));
    localStorage.setItem('maps', JSON.stringify(maps));
}

function get_url(url){
    return axios.get(url).then(res => res.data);
}