import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Message extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.regDate !== nextProps.regDate;
    }

    componentDidMount() {
        this.props.handleRemove(this.props.regDate, this.props.time + 400); // + animation time
    }

    render() {
        const delay = this.props.time / 1000;
        return (
            <div className="toast-alarm" style={{animation: `toastIn .4s, toastOut .4s ${delay}s forwards`}}>
                {this.props.message}
            </div>
        );
    }
}

Message.propTypes = {
    message: PropTypes.string.isRequired,
    time: PropTypes.number.isRequired,
};

export default Message;
