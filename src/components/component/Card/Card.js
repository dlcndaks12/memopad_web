import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as path from 'config/path';
import { ImageLoader } from 'components';
import { mapOpen } from 'modules/modal/map';

class Card extends Component {
    constructor(props) {
        super(props);

        this.handleMap = this.handleMap.bind(this);
    }

    handleMap(map) {
        this.props.mapOpen({
            title: map.title,
            latitude: parseFloat(map.latitude),
            longitude: parseFloat(map.longitude)
        });
    }

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
                                <a onClick={() => this.handleMap(map)} className="btn-map" title="지도">
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

const mapDispatchToProps = (dispatch) => ({
    mapOpen: (payload) => dispatch(mapOpen(payload)),
});

export default connect(null, mapDispatchToProps)(Card);