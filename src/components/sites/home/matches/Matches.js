import React from 'react';
import Match from "./Match";

const Matches = (props) => {
    const data = props.data
    if(data) {
        return (
            <div>
                {data.map((id, i)=>{
                    return(<Match key={i+"_match"} data={id} summoner={props.summmoner} region={props.region}/>);
                })}
            </div>
        );
    }else{
        return "";
    }
};

export default Matches;