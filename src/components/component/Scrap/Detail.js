import React, { Component } from 'react';

class Detail extends Component {

    render() {
        const data = this.props.data;

        return (
            <div className="scrap-article">
                <div className="title">{data.title}</div>
            </div>
        );
    }
}

export default Detail;
