import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as path from 'config/path';
import { ImageLoader } from 'components';
import { toast } from 'modules/toast';
import { deleteScrap, likeScrap, likeScrapCancel } from 'modules/scrap';
import { confirm } from 'modules/confirm';
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
        this.handleDelete = this.handleDelete.bind(this);
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

    handleDelete(idx) {
        this.props.confirm({
            message: '정말 삭제 하시게요?',
            callback: (result) => {
                if (result) {
                    this.props.deleteScrap(idx).then((res) => {
                        this.props.toast(res.message);
                    });
                }
            }
        });
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
        const date = item.regDate.substr(2, 8);

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
                                {/*<i className="material-icons">map</i>*/}
                                <img src={require('resources/images/common/map.svg')}  alt="지도"/>
                            </a>
                            : null
                        }
                    </div>
                    <div className="card-content">
                        <div className="desc">
                            {item.description}
                        </div>
                        {/*<div className="card-date">{item.regDate}</div>*/}
                        <div className="util-area">
                            {!likePending ?
                                <a className={`btn-like ${item.liked ? 'active' : ''}`} onClick={() => this.handleLike(!item.liked)}>
                                    <div className="like-icon">
                                        <div className="heart-animation-1"/>
                                        <div className="heart-animation-2"/>
                                    </div>
                                    {item.likeCount > 0 ? <span className="like-count">{item.likeCount}</span> : undefined}
                                </a> :
                                <a className={`btn-like ${item.liked ? 'active' : ''}`}>
                                    <div className="like-icon">
                                        <div className="heart-animation-1"/>
                                        <div className="heart-animation-2"/>
                                    </div>
                                    {item.likeCount > 0 ? <span className="like-count">{item.likeCount}</span> : undefined}
                                </a>
                            }
                            <Link to={`/${item.writer}`} className="author">{item.writer}</Link>
                        </div>
                        <div className="info-area">
                            <span className="date">{date}</span>
                            {item.owner ? <a className="btn-delete" onClick={() => this.handleDelete(item.idx)}>delete</a> : null}
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
    deleteScrap: (scrapIdx) => dispatch(deleteScrap(scrapIdx)),
    likeScrap: (scrapIdx) => dispatch(likeScrap(scrapIdx)),
    likeScrapCancel: (scrapIdx) => dispatch(likeScrapCancel(scrapIdx)),
    confirm: (message, callback) => dispatch((confirm(message, callback))),
});

export default connect(mapStateToProps, mapDispatchToProps)(Card);