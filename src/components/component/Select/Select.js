import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'react-materialize';

class Select extends Component {
    render() {
        const option = this.props.option;
        return (
            <div>
                {option !== null ?
                    <Input type="select" defaultValue='kr' onChange={this.props.onChange}>
                        <option value="-1">국가</option>
                        {option !== null ? option.map((item, i) => {
                            return (
                                <option value={item.code} key={i}>{item.name}</option>
                            );
                        }) : <option/>}
                    </Input>
                    : '' }
            </div>
        );
    }
}

Select.propTypes = {
    defaultSelected: PropTypes.string,
    option: PropTypes.array,
};

export default Select;
