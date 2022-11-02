import React from 'react';

const SpellDescription = (props) => {
    let desc = props.desc;
    if (typeof desc === 'string') {
        const re = new RegExp('<.*>');
        desc = props.desc.replace(re, "");
    }
    return (
        <>
            <div>
                <h6 align="center">{props.name}</h6>
            </div>
            <div>
                <div className="lore">
                    {desc}
                </div>
            </div>
        </>
    );
};

export default SpellDescription;