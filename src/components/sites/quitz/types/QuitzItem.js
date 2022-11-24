import React, {useRef} from 'react';
import {get_url} from "../../../../other/js/links";
import {random} from "../Quitz";


function QuitzItem(props) {
    const ans = useRef(null);
    const items = JSON.parse(localStorage.getItem('items'));
    const {check, img, num} = item(items);
    const handleClick = () => {
        console.log(ans.current.value);
        if (items.data[ans.current.value].name === check) {
            props.changeOutput(props.output.concat([num, ans.current.value, true]));
        } else {
            props.changeOutput(props.output.concat([num, ans.current.value, false]));
        }
    }

    return (
        <div>
            <img src={img} alt={check}/>
            <select ref={ans} id="item">
                {Object.keys(items.data).map((d) => {
                    return <option key={d} value={d}>{items.data[d].name}</option>
                })}
            </select>
            <input type={"submit"} onClick={handleClick}/>
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
        check = items.data[num].name;
        img = get_url("items", items.data[num].image.full)
        return {check, img, num}
    }else {
        return {check, img};
    }
}

export default QuitzItem;