import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Selection } from 'components';

class Option extends Component {
    render() {
        return (
            <div className="option-area z-depth-1">
                {this.props.city ?
                    <div className="option">
                        <h6>지역</h6>
                        <Selection
                            type="city"
                            item={this.props.city[this.props.selectedNation]}
                            selectedItem={this.props.selectedCity}
                            onChange={this.props.onChange} />
                    </div> : ''}
                <div className="option">
                    <h6>카테고리</h6>
                    <Selection
                        type="category"
                        item={this.props.category}
                        selectedItem={this.props.selectedCategory}
                        onChange={this.props.onChange} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    city: state.location.city,
    category: state.category.category,
    scrap: state.scrap,
});

export default connect(mapStateToProps, null)(Option);
