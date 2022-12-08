import React, {useRef} from 'react';
import {get_url} from "../../../../other/js/links";
import {random} from "../Quitz";
import '../css/QuitzItem.css';


function QuitzItem(props) {
    const ans = useRef(null);
    const items = JSON.parse(localStorage.getItem('items'));
    const {check, img} = item(items);

    const handleClick = () => {
        console.log(ans.current.value);
        if (items.data[ans.current.value].name === check) {
            props.changeOutput(oldArray => [[items.data[ans.current.value].name, img, check, ans.current.value, true], ...oldArray]);
        } else {
            props.changeOutput(oldArray => [[items.data[ans.current.value].name, img, check, ans.current.value, false], ...oldArray]);
        }
    }

    return (
        <div className={"item_quitz_select"}>
            <img src={img} className={"image_item_quitz_select"} alt={check}/>
            <div className={"input_item_quitz_select"}>
                <select ref={ans} id="item_quitz_select">
                    {Object.keys(items.data).map((d) => {
                        return <option key={d} value={d}>{items.data[d].name}</option>
                    })}
                </select>
                <button className={"input_item_quitz_btn"} onClick={handleClick}>Check</button>
            </div>
        </div>
    );
}

function item(items){
    let check, img = ""
    if(items!==undefined) {
        const item_nums = Object.keys(items.data);
        let num = 0;
        while (!item_nums.includes(String(num))) {
            num = random(8020, 1001);
        }
        if (!Object.keys(items.data[num]).includes("requiredChampion") && !Object.keys(items.data[num]).includes("requiredAlly")) {
            check = items.data[num].name;
            img = get_url("items", items.data[num].image.full)
        }else{
            return item(items);
        }
        return {check, img, num}
    }else {
        return {check, img};
    }
}

export default QuitzItem;