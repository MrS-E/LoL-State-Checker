import React, {useRef, useState} from 'react';
import {get_url} from "../../../other/js/links";
import QuitzItem from "./types/QuitzItem";
 //first Design
function Quitz() {
    const [output, changeOutput] = useState([]);

    return (
        <div>
            <QuitzItem changeOutput={changeOutput} output={output}/>
            <div></div>
        </div>
    );
}


function champion(){

}

function spell(){

}

function splash(){

}

function skin(){

}

function map(){
 //maybe not possible because not all images are available
}

export function random(max, min){
    return Math.floor(Math.random() * max) + min;
}
export default Quitz;