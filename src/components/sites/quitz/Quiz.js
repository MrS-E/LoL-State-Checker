import React, {useState} from 'react';
import './css/Quitz.css'
import QuizItem from "./types/QuizItem";
import QuizSkin from "./types/QuizSkin";
import QuizChampionSplash from "./types/QuizChampionSplash";

function Quiz() {
    const [output, changeOutput] = useState([]);
    return (
        <div className={"quitz"}>
            <div className={"input_print_quitz"}>
                {choose(changeOutput, output)}
            </div>
            <div className={"output_print_quitz"}>
                {output.map((d, key) =>{

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

function choose(changeOutput, output){
    const num = random(3,0);
    switch (num){
        case 0:
            return item(changeOutput, output);
        case 1:
            return skin(changeOutput, output);
        case 2:
            return splash(changeOutput, output);
    }
}

function splash(changeOutput, output){
    return(
        <>
            <QuizChampionSplash output={output} changeOutput={changeOutput}/>
        </>
    )
}

function skin(changeOutput,output){
 return(
     <>
        <QuizSkin output={output} changeOutput={changeOutput}/>
     </>
 );
}

function item(changeOutput, output){
    return(
        <>
            <QuizItem changeOutput={changeOutput} output={output}/>
        </>
    );
}

/*
function map(){
 //maybe not possible because not all images are available
}

function spell(changeOutput, output){

}*/

export function random(max, min){
    return Math.floor(Math.random() * max) + min;
}
export default Quiz;