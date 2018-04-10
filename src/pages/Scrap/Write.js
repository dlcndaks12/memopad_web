import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Write as ScrapWrite } from 'components';
import qs from 'query-string';

class Write extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nationSelected: 'kr',
            citySelected: 6,
        };

        this.initSelectedLocations = this.initSelectedLocations.bind(this);
    }

    componentDidMount() {
        this.initSelectedLocations();
    }

    componentDidUpdate(prevProps) {
        if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
            this.initSelectedLocations();
        }
    }

    initSelectedLocations() {
        const params = qs.parse(this.props.location.search);
        const nationCode = params.nation ? params.nation : 'kr';
        const cityLength = this.props.locations.city ? this.props.locations.city[nationCode].length : null;
        const defaultCityIdx = cityLength > 0 ? this.props.locations.city[nationCode][0].idx : -1;

        this.setState({
            nationSelected: nationCode,
            citySelected: defaultCityIdx,
        });
    }

    render() {
        const nationSelected = this.state.nationSelected;
        const citySelected = this.state.citySelected;

        console.log('render = ', nationSelected);
        console.log('render = ', citySelected);

        return (
            <div className="scrap-write">
                <blockquote>공유하고자 하는 link만 입력하시면 간편 스크랩 내용이 채워집니다.</blockquote>
                <ScrapWrite key = {nationSelected + citySelected}
                            nationSelected = {nationSelected}
                            citySelected = {citySelected} />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    locations: state.location,
});

export default connect(mapStateToProps, null)(Write);