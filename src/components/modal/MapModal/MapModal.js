import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GOOGLE_KEY } from 'config/key';
import { GoogleMap } from 'components';
import { mapClose } from 'modules/modal/map';
import './MapModal.scss';

class MapModal extends Component {
    constructor(props) {
        super(props);

        this.handleClose = this.handleClose.bind(this);
    }

    handleClose(e) {
        if (e.target.className.indexOf('modal-mask') > 0) {
            this.props.mapClose();
        }
    }

    render() {
        const { status, title, latitude, longitude } = this.props;
        const key = latitude.toString() + longitude.toString();

        return (
            <div className={`map-modal modal-mask ${status ? 'active' : ''}`} onClick={this.handleClose}>
                <div className="inner">
                    <div className="map">
                        <GoogleMap key={key}
                                   googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_KEY}&v=3.exp&libraries=geometry,drawing,places`}
                                   loadingElement={<div style={{ height: '100%' }}>loading...</div>}
                                   containerElement={<div style={{ height: '100%' }} />}
                                   mapElement={<div style={{ height: '100%' }} />}
                                   title={title}
                                   defaultZoom={17}
                                   defaultCenter={{lat: latitude, lng: longitude}}/>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    status: state.modalMap.status,
    title: state.modalMap.title,
    latitude: state.modalMap.latitude,
    longitude: state.modalMap.longitude,
});

const mapDispatchToProps = (dispatch) => ({
    mapClose: () => dispatch(mapClose()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MapModal);
