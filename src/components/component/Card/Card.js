import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ImageLoader, LikeButton } from 'components';
import { toast } from 'modules/toast';
import { deleteScrap, likeScrap, likeScrapCancel } from 'modules/scrap';
import { confirm } from 'modules/confirm';
import { mapOpen } from 'modules/modal/map';

class Card extends Component {
    constructor(props) {
        super(props);

        this.state = {
            imageDone: false,
            item: props.item,
            map: props.item.map,
        };

        this.handleLoad = this.handleLoad.bind(this);
        this.handleMap = this.handleMap.bind(this);
        this.handleLike = this.handleLike.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.setLikeData = this.setLikeData.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState){
        return JSON.stringify(this.props) !== JSON.stringify(nextProps) || JSON.stringify(this.state) !== JSON.stringify(nextState);
    }

    handleLoad() {
        this.setState({imageDone: true});
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
        const imageDone = this.state.imageDone;
        const item = this.state.item;
        const map = this.state.map;
        const imageUrl = item.imageUrl;
        const likePending = this.props.pending;

        return (
            <div className={`card-wrap ${imageDone ? 'done' : ''}`}>
                <div className="card">
                    <a href={item.url} target="_blank">
                        <div className="card-image-wrap">
                            <div className="card-image">
                                <ImageLoader image={imageUrl}
                                             background
                                             onLoad={this.handleLoad}/>
                            </div>
                        </div>
                        <div className="card-content">
                            <div className="card-title">{item.title}</div>
                            <div className="desc">
                                {item.description}
                            </div>
                        </div>
                    </a>
                    <div className="util-area">
                        <div className="left">
                            {!likePending ?
                                <LikeButton active={item.liked}
                                            count={item.likeCount}
                                            onClick={() => this.handleLike(!item.liked)}/>
                                :
                                <LikeButton active={item.liked}
                                            count={item.likeCount}/>}
                        </div>
                        <div className="right">
                            {item.owner ?
                                <a className="btn-delete" onClick={() => this.handleDelete(item.idx)}><i className="fas fa-trash-alt"/></a>
                                : undefined}
                            {map ?
                                <a onClick={() => this.handleMap(map)} className="btn-map" title="지도">
                                    <i className="fas fa-map-marked-alt"/>
                                </a>
                                : undefined}
                            {/*<Link to={`/${item.writer}`} className="author">{item.writer}</Link>*/}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    pending: state.pender.pending['scrap/LIKE_SCRAP'],
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