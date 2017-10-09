import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'react-materialize';

class Select extends Component {
    render() {
        const option = this.props.option;
        let selectReady = -1;
        let optionEl = [];

        if (option === null) {
            selectReady = 0;
            optionEl.push(<option key="-2">...</option>);
        } else {
            selectReady = 1;
            if (this.props.type === 'nation') {
                optionEl.push(<option value="-1" key="-1">국가</option>);
                for(let i = 0 ; i < option.length; i++) {
                    optionEl.push(<option value={option[i].code} key={i}>{option[i].name}</option>);
                }
            } else if (this.props.type === 'city') {
                optionEl.push(<option value="-1" key="-1">지역</option>);
                for(let i = 0 ; i < option.length; i++) {
                    optionEl.push(<option value={option[i].idx} key={i}>{option[i].name}</option>);
                }
            }
        }

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
