import React, { Component } from 'react';
import { ramdom } from 'util/math';

class Input extends Component {
    render() {
        const type = this.props.type;
        const id = `input_${type}_${ramdom(4)}`;
        const placeholder = this.props.placeholder;
        const className = this.props.className;
        const handleChange = this.props.onChange;
        const handleKeyPress = this.props.onKeyPress;
        const name = this.props.name;
        const value = this.props.value;

        return (
            <div className={`input ${className}`}>
                <input type={type} id={id} name={name} onChange={handleChange} onKeyPress={handleKeyPress} value={value}/>
                {!value && placeholder ?
                    <label htmlFor={id}>{placeholder}</label> : undefined}
            </div>
        );
    }
}

Input.defaultProps = {
    type: 'text',
    name: '',
    className: '',
};

export default Input;
