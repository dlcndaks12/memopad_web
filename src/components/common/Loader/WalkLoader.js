import React from 'react';

const WalkLoader = (props) => {
    const color = props.color;
    const size = props.size;
    const className = props.className ? props.className : '';

    return (
        <div className={`circle-loader-wrap ${color} ${className}`} style={{fontSize: `${size}px`}}>
            <div className="loader-walk">
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
            </div>
        </div>
    );
};

WalkLoader.defaultProps = {
    size: 100,
    color: '',
};

export default WalkLoader;