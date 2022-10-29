import React from 'react';
import {Line} from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto'

const Graph = (props) => {
    const options = {
        options: {
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
                legend: {
                    display: false,
                },
                title: {
                    display: true,
                    text: 'Stats'
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,

                    },
                    min: 0,
                    ticks: {
                        stepSize: 1
                    }
                },
                y: {
                    title: {
                        display: true,
                    },
                    min: 0,
                    ticks: {
                        stepSize: 10
                    }
                }
            }
        },
    }
    return (
        <div>
            <Line height="400vmin" data={props.data} options={options}/>
        </div>
    );
};

export default Graph;
/*
* Dataformate
* {
* labels: [],
* datasets:[
*   {
*  label: ,
*  data:[],
* }
* ]
* */
