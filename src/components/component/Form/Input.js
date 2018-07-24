import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Input extends Component {
    render() {
        const type = this.props.type;
        const id = this.props.id;
        const placeholder = this.props.placeholder;
        const className = this.props.className;
        const handleChange = this.props.onChange;
        const handleKeyPress = this.props.onKeyPress;
        const name = this.props.name;
        const value = this.props.value;
        const disabled = this.props.disabled;

        return (
            <div className={`input ${className}`}>
                <input type={type} id={id} name={name} onChange={handleChange} onKeyPress={handleKeyPress} value={value} disabled={disabled}/>
                {!value && placeholder ?
                    <label htmlFor={id}>{placeholder}</label> : undefined}
            </div>
        );
    }
}

Input.propTypes = {
    id: PropTypes.string.isRequired,
};

Input.defaultProps = {
    type: 'text',
    name: '',
    className: '',
    disabled: false,
};

export default Input;
