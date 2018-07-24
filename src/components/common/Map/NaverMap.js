import React, {Component} from 'react';
import PropTypes from 'prop-types';

const naver = window.naver;

class NaverMap extends Component {
    constructor(props) {
        super(props);

        this.state = {
            map: null,
        }
    }

    componentDidMount() {
        const id = this.props.id;
        const defaultCenter = this.props.defaultCenter;
        const mapOptions = {
            center: new naver.maps.LatLng(defaultCenter.lat, defaultCenter.lng),
            zoom: 10
        };

        const map = new naver.maps.Map(id, mapOptions);
        this.setState({map: map});
    }


    render() {
        const id = this.props.id;

        return (
            <div className="naver-map">
                <div id={id} className="naver-map-cont"/>
            </div>
        );
    }
}

NaverMap.propTypes = {
    id: PropTypes.string.isRequired,
    defaultCenter: PropTypes.object,
};
NaverMap.defaultProps = {
    defaultCenter: {lat: 37.3595704, lng: 127.105399}
};

export default NaverMap;
