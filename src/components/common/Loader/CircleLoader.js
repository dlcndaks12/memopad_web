import React from 'react';

const CircleLoader = (props) => {
    const color = props.color ? props.color + '-loader' : '';
    return (
        <div className={`circle-loader-wrap ${color}`}>
            <div className="preloader-wrapper small active">
                <div className="spinner-layer spinner-blue-only">
                    <div className="circle-clipper left">
                        <div className="circle" />
                    </div>
                    <div className="gap-patch">
                        <div className="circle" />
                    </div>
                    <div className="circle-clipper right">
                        <div className="circle" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CircleLoader;
