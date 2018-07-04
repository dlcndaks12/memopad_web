import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Checkbox extends Component {

    shouldComponentUpdate(nextProps) {
        return JSON.stringify(this.props) !== JSON.stringify(nextProps);
    }

    render() {
        const id = this.props.id;
        const name = this.props.name;
        const label = this.props.label;
        const value = this.props.value;
        const checked = this.props.checked;
        const handleChange = this.props.onChange;

        return (
            <div className="checkbox-wrap">
                <div className="checkbox">
                    <input type="checkbox" id={id} name={name} value={value} checked={checked} onChange={handleChange}/>
                    <label htmlFor={id}>{label}</label>
                </div>
            </div>
        );
    }
}

Checkbox.propTypes = {
    id: PropTypes.string.isRequired,
};
Checkbox.defaultProps = {};

export default Checkbox;
