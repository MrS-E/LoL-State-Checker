import React from 'react';
import '../../css/PopUp.css'
import './css/ItemsPopUp.css'
import {items} from "../../../other/js/links";



const ItemsPopUp = (props) => {
    const data = props.data.data;
    if(props.trigger){
        return(
            <div className="popup">
                <div className="popup-inner">
                    <div>
                        <button className="close-btn" onClick={() => {props.setTrigger(false)}}>close</button>
                    </div>
                    <div>
                        <h1>{data[props.item].name}</h1>
                        <hr/>
                        <div className="pop_item_main_div">
                            <div>
                                <img className="pop_item_img" alt={data[props.item].name} src={items + data[props.item].image.full}/>
                                <div>
                                    <h5>Tags:</h5>
                                    {data[props.item].tags.map((d,k)=><span key={k}>{d}<br/></span>)}
                                    <div className="pop_item_build">
                                        {build(data, props)}
                                    </div>
                                </div>
                            </div>
                            <div className="pop_item_stats">
                                <h5>Description:</h5>
                                {(data[props.item].description).replace(/<[\/-z]*>/g, " ").replace(/\{\{ [*-z]* }}/g, " ").replace(/<[0-z]* \/>/g, " ").replace("  ", " ")}
                                <span><br/><strong>Buy (base): </strong>{data[props.item].gold.base}</span>
                                <span><br/><strong>Buy (total): </strong>{data[props.item].gold.total}</span>
                                <span><br/><strong>Sell: </strong>{data[props.item].gold.sell}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }else{
        return "";
    }
};

function build(data, props){
    if(data[props.item].into !== undefined && data[props.item].from !== undefined){
        return(
            <>
                <h5>Builds into:</h5>
                {data[props.item].into.map((x, key)=>{
                    return <img className="pop_item_img_build" key={key} src={items + data[x].image.full} alt={x}/>;
                })}
                <h5>Builds from:</h5>
                {data[props.item].from.map((x, key)=>{
                    return <img className="pop_item_img_build" key={key} src={items + data[x].image.full} alt={x}/>;
                })}
            </>
        );
    } else if(data[props.item].into !== undefined){
        return(
            <>
                <h5>Builds into:</h5>
                {data[props.item].into.map((x, key)=>{
                    return <img className="pop_item_img_build" key={key} src={items + data[x].image.full} alt={x}/>;
                })}
            </>
        );
    } else if(data[props.item].from !== undefined){
        return(
            <>
                <h5>Builds from:</h5>
                {data[props.item].from.map((x, key)=>{
                    return <img className="pop_item_img_build" key={key} src={items + data[x].image.full} alt={x}/>;
                })}
            </>
        );
    }
}

export default ItemsPopUp;