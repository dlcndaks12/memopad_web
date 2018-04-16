import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as path from 'config/path';
import { ImageLoader } from 'components';
import { toast } from 'modules/toast';
import { likeScrap, likeScrapCancel } from 'modules/scrap';
import { mapOpen } from 'modules/modal/map';

class Card extends Component {
    constructor(props) {
        super(props);

        this.state = {
            item: this.props.item,
            map: this.props.item.map,
        };

        this.handleMap = this.handleMap.bind(this);
        this.handleLike = this.handleLike.bind(this);
        this.setLikeData = this.setLikeData.bind(this);
    }

    handleMap(map) {
        this.props.mapOpen({
            title: map.title,
            latitude: parseFloat(map.latitude),
            longitude: parseFloat(map.longitude)
        });
    }

    handleLike(flag) {
        const idx = this.props.item.idx;
        if (!this.props.auth.isLoggedIn) {
            this.props.toast('로그인 해주세요.');
            return;
        }

        if (flag) {
            this.props.likeScrap(idx).then((res) => {
                if (res.result === 'OK') {
                    this.setLikeData(res.data.likeCount, true);
                }
            }).catch((res) => {
                console.log(res);
            });
        } else {
            this.props.likeScrapCancel(idx).then((res) => {
                if (res.result === 'OK') {
                    this.setLikeData(res.data.likeCount, false);
                }
            }).catch((res) => {
                console.log(res);
            });
        }
    }

    setLikeData(likeCount, liked) {
        this.setState({
            item: {
                ...this.state.item,
                likeCount: likeCount,
                liked: liked,
            },
        });
    }

    render() {
        const item = this.state.item;
        const map = this.state.map;
        const imageUrl = item.imageUrl.replace(/%/gi, '%25');
        const likePending = this.props.pending['scrap/LIKE_SCRAP'];

        return (
            <div className="card-wrap">
                <div className="card">
                    <div className="card-image-wrap">
                        <a href={item.url} target="_blank" className="card-image">
                            <ImageLoader image={`${path.apiUrl}/api/image?url=${imageUrl}`}
                                         background/>
                            <span className="card-title">{item.title}</span>
                        </a>
                        {map ?
                            <a onClick={() => this.handleMap(map)} className="btn-map" title="지도">
                                <img src={require('resources/images/common/map.svg')}  alt="지도"/>
                            </a>
                            : null
                        }
                    </div>
                    <div className="card-content">
                        <p className="desc">
                            {item.description}
                        </p>
                        {/*<div className="card-date">{item.regDate}</div>*/}
                        <div className="util-area">
                            {!likePending ?
                                <a className={`btn-like ${item.liked ? 'active' : ''}`} onClick={() => this.handleLike(!item.liked)}>
                                    <span className="like-icon">
                                        <div className="heart-animation-1"/>
                                        <div className="heart-animation-2"/>
                                    </span>
                                    {item.likeCount > 0 ? <span className="like-count">{item.likeCount}</span> : null}
                                </a> :
                                <a className={`btn-like ${item.liked ? 'active' : ''}`}>
                                    <span className="like-icon">
                                        <div className="heart-animation-1"/>
                                        <div className="heart-animation-2"/>
                                    </span>
                                    {item.likeCount > 0 ? <span className="like-count">{item.likeCount}</span> : null}
                                </a>
                            }
                            <Link to={`/${item.writer}`} className="author"><em>{item.writer}</em>'s pick</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    pending: state.pender.pending,
});

const mapDispatchToProps = (dispatch) => ({
    toast: (content, time) => dispatch(toast(content, time)),
    mapOpen: (payload) => dispatch(mapOpen(payload)),
    likeScrap: (scrapIdx) => dispatch(likeScrap(scrapIdx)),
    likeScrapCancel: (scrapIdx) => dispatch(likeScrapCancel(scrapIdx)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Card);