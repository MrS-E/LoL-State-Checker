import React, {useState} from 'react';
import './css/Quitz.css'
import QuitzItem from "./types/QuitzItem";
import QuitzSkin from "./types/QuitzSkin";

function Quitz() {
    const [output, changeOutput] = useState([]);
    return (
        <div className={"quitz"}>
            <div className={"input_print_quitz"}>
                {skin(changeOutput, output)}
            </div>
            <div className={"output_print_quitz"}>
                {output.map((d, key) =>{
                    //console.log(d)

                    if(d[4]) {
                        return(<div key={key} className={"win"}><img className={(d[3]+"_quitz")} src={d[1]} alt={d[2]}/> <span>{d[2]}</span></div>);
                    }else{
                        return(<div key={key} className={"lose"}><img className={(d[3]+"_quitz")} src={d[1]} alt={d[2]}/> <span>{d[2]}</span></div>);
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

function skin(changeOutput,output){
 return(
     <>
        <QuitzSkin output={output} changeOutput={changeOutput}/>
     </>
 );
}

function map(){
 //maybe not possible because not all images are available
}

function item(changeOutput, output){
    return(
        <>
            <QuitzItem changeOutput={changeOutput} output={output}/>
        </>
    );
}

export function random(max, min){
    return Math.floor(Math.random() * max) + min;
}
export default Quitz;