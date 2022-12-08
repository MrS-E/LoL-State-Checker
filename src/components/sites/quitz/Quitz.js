import React, {useState} from 'react';
import './css/Quitz.css'
import QuitzItem from "./types/QuitzItem";

function Quitz() {
    const [output, changeOutput] = useState([]);
    return (
        <div className={"quitz"}>
            <QuitzItem changeOutput={changeOutput} output={output}/>
            <div className={"output_print_quitz"}>
                {output.map((d, key) =>{
                    console.log(d)
                    if(d[4]) {
                        return(<div key={key} className={"win"}><img src={d[1]} alt={d[2]}/> <span>{d[2]}</span></div>);
                    }else{
                        return(<div key={key} className={"lose"}><img src={d[1]} alt={d[2]}/> <span>{d[2]}</span></div>);
                    }
                })}
            </div>
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