import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Selection } from 'components';

class Option extends Component {
    render() {
        const selectedNation = this.props.selectedNation;

        return (
            <div className="option-area">
                {this.props.city && this.props.city[selectedNation].length > 0 ?
                    <div className="option">
                        {/*<h6>지역</h6>*/}
                        <Selection
                            key={selectedNation}
                            type="city"
                            nationCode={selectedNation}
                            item={this.props.city[selectedNation]}
                            selectedItem={this.props.selectedCity}
                            onChange={this.props.onChange} />
                    </div> : undefined}
                {this.props.category ?
                    <div className="option">
                        {/*<h6>카테고리</h6>*/}
                        <Selection
                            key={selectedNation}
                            type="category"
                            nationCode={selectedNation}
                            item={this.props.category}
                            selectedItem={this.props.selectedCategory}
                            onChange={this.props.onChange} />
                    </div> : undefined}
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
