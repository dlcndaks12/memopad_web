import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ReviewWrite } from 'components';
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

        return (
            <div className="contents review-write">
                <blockquote>여러분이 직접 가본 후기와 아름다운 사진을 올려주세요.</blockquote>
                <ReviewWrite key = {nationSelected + citySelected}
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