//TODO storage for json

import {queueID} from "./links";
import data from "bootstrap/js/src/dom/data";

var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
        var status = xhr.status;
        if (status === 200) {
            callback(null, xhr.response);
        } else {
            callback(status, xhr.response);
        }
    };
    xhr.send();
};

getJSON('http://query.yahooapis.com/v1/public/yql?q=select%20%2a%20from%20yahoo.finance.quotes%20WHERE%20symbol%3D%27WRC%27&format=json&diagnostics=true&env=store://datatables.org/alltableswithkeys&callback',
    function(err, data) {
        if (err !== null) {
            alert('Something went wrong: ' + err);
        } else {
            alert('Your query count: ' + data.query.count);
        }
    });


async function convert_queue() {
    const queuetyp_data = await get_data(queueID);
    let queue = {};
    for (let x = 0; x < queuetyp_data.length; x++) {
        queue[queuetyp_data[x]["queueId"]] = {
            "name": queuetyp_data[x]["description"],
            "desc": queuetyp_data[x]["notes"],
            "map": queuetyp_data[x]["map"]
        }
    }
    console.log(queue)
    return queue;
}

//export const queue = await convert_queue();