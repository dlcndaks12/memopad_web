import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as path from 'config/path';
import { ImageLoader } from 'components';

class Card extends Component {
    render() {
        const item = this.props.item;
        const imageUrl = item.imageUrl.replace(/%/gi, '%25');

        return (
            <div className="card-wrap">
                <div className="card">
                    <a href={item.url} target="_blank" className="card-image">
                        <ImageLoader image={`${path.apiUrl}/api/image?url=${imageUrl}`}
                                     background/>
                        <span className="card-title">{item.title}</span>
                    </a>
                    <div className="card-content">
                        <p className="desc">
                            {item.description}
                        </p>
                        {/*<div className="card-date">{item.regDate}</div>*/}
                        <Link to={`/${item.writer}`} className="author"><em>{item.writer}</em>'s pick</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Card;