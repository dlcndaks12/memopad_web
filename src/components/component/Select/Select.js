import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'react-materialize';

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

        console.log('re');

        return (
            <div>
                <Input key={selectReady} name={this.props.type} type="select" defaultValue={this.props.defaultSelected} onChange={this.props.onChange}>
                    {optionEl}
                </Input>
            </div>
        );
    }
}

Select.propTypes = {
    defaultSelected: PropTypes.string,
    option: PropTypes.array,
};

export default Select;
