import React from 'react';

const SpellDescription = (props) => {
    let desc = props.desc;
    let tooltip = props.tooltip;
    if (typeof desc === 'string') {
        desc = desc.replace(/<[\/-z]*>/g, " ").replace(/\{\{ [*-z]* }}/g, " ").replace(/<[0-z]* \/>/g, " ").replace("  ", " ");
    }
    if (typeof tooltip === 'string'){
        tooltip = tooltip.replace(/<[\/-z]*>/g, " ").replace(/\{\{ [*-z]* }}/g, " ").replace(/<[0-z]* \/>/g, " ").replace("  ", " ");
    }
    return (
        <>
            <div>
                <h6 align="center">{props.name}</h6>
            </div>
            <div>
                <div className="lore">
                    <p>{desc}</p>
                    {
                       showTooltip(tooltip)
                    }

                </div>
            </div>
        </>
    );
};

function showTooltip(tooltip){
    if(tooltip){
        return(<p><strong>Tooltip:</strong><br/>{tooltip}</p>);
    }
}

export default SpellDescription;