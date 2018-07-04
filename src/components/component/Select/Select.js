import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Select extends Component {
    render() {
        const option = this.props.option;
        let selectReady = -1;
        let optionEl = [];
        let keyValue = 'idx';

        if (this.props.type === 'nation') {
            keyValue = 'code'
        }
        if (option && option.length > 0) {
            selectReady = 1;
            if (option.length > 1) {
                // category 의 경우 default 값을 넣는다
                if (this.props.type === 'category') {
                    optionEl.push(<option value="-1" key={-1}>분류</option>);
                }
                for(let i = 0 ; i < option.length; i++) {
                    optionEl.push(<option value={option[i][keyValue]} key={i}>{option[i].name}</option>);
                }
            } else {
                optionEl = <option value={option[0][keyValue]}>{option[0].name}</option>;
            }
        } else {
            selectReady = 0;
            optionEl = <option key="-2">...</option>;
        }

        return (
            <div className="select">
                <select key={selectReady} name={this.props.type} defaultValue={this.props.defaultSelected} onChange={this.props.onChange}>
                    {optionEl}
                </select>
            </div>
        );
    }
}

Select.propTypes = {
    option: PropTypes.array,
};

export default Select;
