import React, {Component} from 'react';
import PropTypes from 'prop-types';

const naver = window.naver;

class NaverMap extends Component {
    constructor(props) {
        super(props);

        this.state = {
            map: null,
            marker: null,
            infoWindow: null,
        };

        this.displayMap = this.displayMap.bind(this);
        this.displayMarker = this.displayMarker.bind(this);
        this.displayContent = this.displayContent.bind(this);
    }

    componentDidMount() {
        const defaultCenter = this.props.defaultCenter;
        const target = new naver.maps.LatLng(defaultCenter.lat, defaultCenter.lng);

        this.displayMap(target);
        this.displayMarker(target);
        this.displayContent(target);
    }

    displayMap(target) {
        const id = this.props.id;
        const mapOptions = {
            center: target,
            zoom: 10
        };

        this.setState(() => ({
            map: new naver.maps.Map(id, mapOptions),
        }));
    }

    displayMarker(target) {
        this.setState((prevState) => ({
            marker: new naver.maps.Marker({
                position: target,
                map: prevState.map,
            })
        }));
    }

    displayContent() {
        const title = this.props.title;
        const address = this.props.address ? this.props.address : '';
        const roadAddress = this.props.roadAddress ? this.props.roadAddress : '';

        const contentString = `
            <div class="marker-info">
                <div class="marker-title">${title}</div>
                ${address ? `<div class="marker-address">${address} ${roadAddress ? `<br/>${roadAddress}` : ''}</div>` : ''}
            </div>
        `;

        this.setState(() => ({
            infoWindow: new naver.maps.InfoWindow({
                content: contentString
            })
        }), () => {
            const infoWindow = this.state.infoWindow;
            const map = this.state.map;
            const marker = this.state.marker;
            infoWindow.open(this.state.map, this.state.marker);
            naver.maps.Event.addListener(this.state.marker, 'click', () => {
                if (infoWindow.getMap()) {
                    infoWindow.close();
                } else {
                    infoWindow.open(map, marker);
                }
            });
        });
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
    defaultCenter: {lat: 37.3595704, lng: 127.105399},
    address: '',
    roadAddress: '',
};

export default NaverMap;
