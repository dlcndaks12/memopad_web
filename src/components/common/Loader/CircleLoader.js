import React from 'react';

const CircleLoader = (props) => {
    const color = props.color;
    const size = props.size;
    const className = props.className ? props.className : '';

    return (
        <div className={`circle-loader-wrap ${color} ${className}`} style={{height: `${size}px`}}>
            <div className="circle-loader" style={{width: `${size}px`}}>
                <svg className="circular" viewBox="25 25 50 50">
                    <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="3" strokeMiterlimit="10"/>
                </svg>
            </div>
        </div>
    );
};

CircleLoader.defaultProps = {
    size: 100,
    color: '',
};

export default CircleLoader;