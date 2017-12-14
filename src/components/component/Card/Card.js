import React, { Component } from 'react';
import * as path from 'config/path';

class Card extends Component {
    render() {
        const item = this.props.item;
        return (
            <div className="card-wrap">
                <div className="card">
                    <div className="card-image" style={{backgroundImage: `url(${path.apiUrl}/api/image?url=${this.props.item.imageUrl})`}} />
                    <div className="card-content">
                        <span className="card-title" title="Card Title">{item.title}</span>
                        <p className="desc">
                            {item.description}
                        </p>
                        <div className="card-date">{item.regDate}</div>
                    </div>
                    <div className="card-action">
                        <span className="author">{item.writer}</span>
                        <a href={item.url} target="_blank" className="btn-link">
                            <i className="small red-text text-lighten-3 material-icons">open_in_new</i>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Card;