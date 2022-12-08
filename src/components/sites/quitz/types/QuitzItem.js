import React, {useRef} from 'react';
import {get_url} from "../../../../other/js/links";
import {random} from "../Quitz";
import '../css/QuitzItem.css';


function QuitzItem(props) {
    const ans = useRef(null);
    const keys = sort_items_alphabet(JSON.parse(localStorage.getItem('items')));
    const items = JSON.parse(localStorage.getItem('items'));
    console.log(keys);
    const {check, img} = item(items, keys);

    const handleClick = () => {
        console.log(ans.current.value);
        if (items.data[ans.current.value].name === check) {
            console.log([items.data[ans.current.value].name, img, check, ans.current.value, true])
            props.changeOutput(oldArray => [[items.data[ans.current.value].name, img, check, "item", true], ...oldArray]);
        } else {
            console.log([items.data[ans.current.value].name, img, check, ans.current.value, false])
            props.changeOutput(oldArray => [[items.data[ans.current.value].name, img, check, "item", false], ...oldArray]);
        }
    }

    return (
        <div className={"item_quitz_select"}>
            <img src={img} className={"image_item_quitz_select"} alt={check}/>
            <div className={"input_item_quitz_select"}>
                <select ref={ans} id="item_quitz_select">
                    {keys.map((d) => {
                        return <option key={d} value={d}>{items.data[d].name}</option>
                    })}
                </select>
                <button className={"input_item_quitz_btn"} onClick={handleClick}>Check</button>
            </div>
        </div>
    );
}
function sort_items_alphabet(data) {
    if (data !== undefined) {
        let items = [];
        let items_temp = [];
        Object.keys(data.data).forEach((d) => {
            //console.log(d, Object.keys(data.data[d]))
            if (!Object.keys(data.data[d]).includes("requiredChampion") && !Object.keys(data.data[d]).includes("requiredAlly")) {
                items_temp.push([data.data[d].name, d]);
            }
        })
        items_temp = [...new Set(items_temp.sort((a, b) => {
            if (a[0] < b[0]) {
                return -1;
            } else if (b[0] < a[0]) {
                return 1;
            } else {
                return 0;
            }
        }))]
        items_temp.forEach((d) => {
            items.push(d[1])
        });
        return items;
    }
}

function item(items, keys){
    let check = ""
    let img = ""
    if(items!==undefined) {
        const item_nums = keys;
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