//TODO storage for json, aufruf aus index.html (already added to index.html)
//mit localsorage (localStorage.setItem('note', JSON. stringify(note)); &&  localStorage.getItem('note'))
import axios from "axios";
import {get_url as urls} from "./links";


export function run_local(){
    Promise.all([get_version(), get_queueIDs(), get_items(), get_champions()]).then(()=>console.log("loaded to localStorage"));
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
    localStorage.setItem('champions', JSON.stringify(item));
}

async function get_queueIDs(){
    const queues = await get_url(urls("queueID"));
    localStorage.setItem('champions', JSON.stringify(queues));
}

function get_url(url){
    return axios.get(url).then(res => res.data);
}