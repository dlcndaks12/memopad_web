import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Textarea extends Component {
    render() {
        const id = this.props.id;
        const height = this.props.height;
        const placeholder = this.props.placeholder;
        const className = this.props.className;
        const handleChange = this.props.onChange;
        const handleKeyPress = this.props.onKeyPress;
        const name = this.props.name;
        const value = this.props.value;

        return (
            <div className={`textarea ${className}`}>
                <textarea id={id} name={name} onChange={handleChange} onKeyPress={handleKeyPress} value={value} style={{height: height}}/>
                {!value && placeholder ?
                    <label htmlFor={id}>{placeholder}</label> : undefined}
            </div>
        );
    }
}

Textarea.propsTypes = {
    id: PropTypes.string.isRequired,
};

Textarea.defaultProps = {
    name: '',
    className: '',
    height: '100px',
};

export default Textarea;
