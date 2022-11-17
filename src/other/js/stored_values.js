import axios from "axios";
import {get_url as urls} from "./links";


export function run_local(){
    get_version().then(()=>{
        get_queueIDs().then(()=>{
            get_items().then(()=>{
                get_champions().then(()=>{
                    console.log("loaded to localStorage")
                })
            })
        })
    });
}

async function get_version(){
    const version = await get_url(urls("version"));
    localStorage.setItem('version', version[0] );
    //console.log(localStorage.getItem('version'));
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

function get_url(url){
    return axios.get(url).then(res => res.data);
}