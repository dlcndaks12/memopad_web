import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GOOGLE_KEY } from 'config/key';
import { GoogleMap, NaverMap, LikeButton, ScrapWrite } from 'components';
import { toast } from 'modules/toast';
import { handleLike } from 'modules/scrap';

class Detail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: props.data,
            address: '',
            isModifyMode: false,
        };

        this.handleScrapLike = this.handleScrapLike.bind(this);
        this.handleModify = this.handleModify.bind(this);
    }

    handleScrapLike(flag) {
        const idx = this.props.data.idx;
        this.props.handleLike(idx, flag).then((res) => {
            if (res.result === 'OK') {
                const likeCount = res.data.likeCount;
                this.setState({
                    data: {
                        ...this.state.data,
                        likeCount: likeCount,
                        liked: flag,
                    },
                });
            }
        }).catch((res) => {
            this.props.toast(res.message);
        });
    }

    handleModify(isModifyMode) {
        this.setState({isModifyMode: isModifyMode});
    }

    render() {
        const data = this.state.data;
        const map = data.map;
        const likePending = this.props.likePending;
        const isModifyMode = this.state.isModifyMode;

        return (
            <div className="scrap-article">
                {!isModifyMode ?
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
                                                onClick={() => this.handleScrapLike(!data.liked)}/>
                                    :
                                    <LikeButton active={data.liked}
                                                count={data.likeCount}/>}
                                {data.owner ?
                                    <div className="owner-area">
                                        <a key="scrap_modify" className="btn-modify" onClick={() => this.handleModify(true)}><i className="fas fa-pen"/></a>
                                        <a key="scrap_delete" className="btn-delete" onClick={() => this.handleDelete(data.idx)}><i className="fas fa-trash-alt"/></a>
                                    </div>
                                    : undefined}
                            </div>
                        </div>
                        {data.map ?
                            <div className="map-area">
                                <div className="section-title">위치</div>
                                <div className="address-wrap">
                                    {map.address ? <div className="address">{map.address}</div> : undefined}
                                    {map.roadAddress ? <div className="road-address">{map.roadAddress}</div> : undefined}
                                </div>
                                <div className="map">
                                    {data.nationCode === 'kr' ?
                                        <NaverMap id="scrap-detail-map"
                                                  title={map.title}
                                                  address={map.address}
                                                  roadAddress={map.roadAddress}
                                                  defaultCenter={{lat: parseFloat(map.latitude), lng: parseFloat(map.longitude)}}/>
                                        :
                                        <GoogleMap googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_KEY}&v=3.exp&libraries=geometry,drawing,places`}
                                                   loadingElement={<div style={{ height: '100%' }} />}
                                                   containerElement={<div style={{ height: '100%' }} />}
                                                   mapElement={<div style={{ height: '100%' }} />}
                                                   title={map.title}
                                                   defaultZoom={15}
                                                   defaultCenter={{lat: parseFloat(map.latitude), lng: parseFloat(map.longitude)}}/>}
                                </div>
                            </div> : undefined}
                    </div>
                    :
                    <ScrapWrite isModifyMode={true}
                                data={data}
                                nationSelected={data.nationCode}
                                citySelected={data.city}
                                handleCancelModify={() => this.handleModify(false)}/>}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    likePending: state.pender.pending['scrap/LIKE_SCRAP'],
});

const mapDispatchToProps = (dispatch) => ({
    toast: (message) => dispatch(toast(message)),
    handleLike: (idx, isLiked) => dispatch(handleLike(idx, isLiked)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
