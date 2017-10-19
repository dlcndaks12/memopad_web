import React, { Component } from 'react';
import { connect } from 'react-redux';
import { City, Category } from 'components';

class Option extends Component {
    constructor(props) {
        super(props);

        this.state = {
            city: null,
        };
    }

    componentWillMount() {
        if(this.props.city) {
            this.setState({
                city: this.props.city[this.props.nation],
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            city: nextProps.city ? nextProps.city[nextProps.nation] : null,
        });
    }

    render() {
        return (
            <div className="option-area z-depth-1">
                {this.state.city && this.state.city.length > 0 ?
                    <div className="option">
                        <h6>지역</h6>
                        <City
                            city={this.state.city}
                            onChangeCity={this.props.onChangeCity} />
                    </div> : ''}
                <div className="option">
                    <h6>카테고리</h6>
                    <Category />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    city: state.location.city,
});

export default connect(mapStateToProps, null)(Option);
