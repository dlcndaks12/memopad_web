import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as path from 'config/path';
import { ImageLoader } from 'components';

class Card extends Component {
    render() {
        const item = this.props.item;
        const map = this.props.item.map;
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
                        <div className="util-area">
                            <Link to={`/${item.writer}`} className="author"><em>{item.writer}</em>'s pick</Link>
                            {map ?
                                <a href={`https://www.google.co.kr/maps/@${map.latitude},${map.longitude},15.75z?hl=ko`} target="_blank" className="btn-map" title="지도">
                                    <img src={require('resources/images/common/map.svg')}  alt="지도"/>
                                </a>
                                : null
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Card;