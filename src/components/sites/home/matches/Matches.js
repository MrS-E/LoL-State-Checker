import React from 'react';
import useFetch from "../../../../hooks/useFetch";
import {get_request} from "../../../../other/js/links";
import Match from "./Match";

const Matches = (props) => {
    const url_matchhistory=get_request("match_ids_by_puuid",props.region,"region",[props.puuid,0,props.games],"query");
    const{data, loading} = useFetch(url_matchhistory);
    if(loading) return <h3>Loading</h3>;
    if(data) {
        return (
            <div>
                {data.map((id, i)=>{
                    return(<Match key={i} id={id} region={props.region} summoner={props.summmoner} platform={props.platform}/>);
                })}
            </div>
        );
    }
};

export default Matches;
//TODO  idea for wincounting, 2d array of match_ids