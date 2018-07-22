import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GOOGLE_KEY } from 'config/key';
import { Map, LikeButton } from 'components';
import { handleLike } from 'modules/scrap';

class Detail extends Component {

    handleLike(flag) {
        const idx = this.props.data.idx;
        this.props.handleLike(idx, flag);
    }

    render() {
        const data = this.props.data;
        const map = data.map;
        const likePending = this.props.likePending;

        return (
            <div className="scrap-article">
                <div className="detail-area">
                    <div className="thumb">
                        <img src={data.imageUrl} alt=""/>
                        <a href={data.url} target="_blank" className="link">
                            <i className="fas fa-external-link-square-alt"/>
                        </a>
                    </div>
                    <div className="page-info">
                        <div className="title">{data.title}</div>
                        <div className="desc">{data.description}</div>
                        <div className="btn-area">
                            {!likePending ?
                                <LikeButton active={data.liked}
                                            count={data.likeCount}
                                            onClick={() => this.handleLike(!data.liked)}/>
                                :
                                <LikeButton active={data.liked}
                                            count={data.likeCount}/>}
                            {data.owner ?
                                <a className="btn-delete" onClick={() => this.handleDelete(data.idx)}><i className="fas fa-trash-alt"/></a>
                                : undefined}
                        </div>
                    </div>
                    <div className="map-area">
                        <div className="section-title">위치</div>
                        <div className="map">
                            <Map googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_KEY}&v=3.exp&libraries=geometry,drawing,places`}
                                 loadingElement={<div style={{ height: '100%' }} />}
                                 containerElement={<div style={{ height: '100%' }} />}
                                 mapElement={<div style={{ height: '100%' }} />}
                                 title={map.title}
                                 defaultZoom={15}
                                 defaultCenter={{lat: parseFloat(map.latitude), lng: parseFloat(map.longitude)}}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    likePending: state.pender.pending['scrap/LIKE_SCRAP'],
});

const mapDispatchToProps = (dispatch) => ({
    handleLike: (idx, isLiked) => dispatch(handleLike(idx, isLiked)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
