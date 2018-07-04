import React from 'react';

const CircleLoader = (props) => {
    const color = props.color;
    const size = props.size;
    const className = props.className ? props.className : '';

    return (
        <div className={`circle-loader-wrap ${color} ${className}`}>
            <div className="circle-loader" style={{width: `${size}px`, height: `${size}px`}}/>
        </div>
    );
};

CircleLoader.defaultProps = {
    size: 60,
    color: '',
};

export default CircleLoader;