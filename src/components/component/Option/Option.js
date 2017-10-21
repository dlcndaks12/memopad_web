import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Selection } from 'components';

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
                        <Selection
                            type="city"
                            item={this.state.city}
                            onChange={this.props.onChange} />
                    </div> : ''}
                <div className="option">
                    <h6>카테고리</h6>
                    <Selection
                        type="category"
                        item={this.props.category}
                        onChange={this.props.onChange} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    city: state.location.city,
    category: state.category.category,
});

export default connect(mapStateToProps, null)(Option);
