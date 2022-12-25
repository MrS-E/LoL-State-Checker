import React from 'react';
import Chart from "chart.js/auto";
import { Pie } from "react-chartjs-2";

function WinGraph(props) {

    const data = {
        datasets: [
            {
                backgroundColor: ["rgb(0,0,255)","rgb(255,0,0)"],
                borderColor: ["rgb(0,0,255)","rgb(255,0,0)"],
                data: [props.wins, props.loses],
            },
        ],
    };
    return (
        <div className={"WinGraph"}>
            <Pie data={data} />
        </div>
    );
}

export default WinGraph;
