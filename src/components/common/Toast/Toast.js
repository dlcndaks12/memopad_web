import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Message } from 'components';

class Toast extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messageQueue: [],
        };
        this.handleRemove = this.handleRemove.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const message = nextProps.message;
        const messageQueue = this.state.messageQueue;
        const time = nextProps.time;
        messageQueue.push({
            message: message,
            time: time,
            regDate: nextProps.regDate,
        });
        this.setState({
            messageQueue: messageQueue,
        });
    }

    handleRemove(regDate, time) {
        setTimeout(() => {
            const messageQueue = this.state.messageQueue;
            const newMessageQueue = messageQueue.filter((item) => {
                return regDate !== item.regDate;
            });

            this.setState({
                messageQueue: newMessageQueue,
            });
        }, time);
    }

    render() {
        return (
            <div className="toast-wrap" ref="toast">
                {this.state.messageQueue.map((item) => {
                    return (
                        <Message key={item.regDate} regDate={item.regDate} message={item.message} time={item.time} handleRemove={this.handleRemove}/>
                    );
                })}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    message: state.toast.message,
    time: state.toast.time,
    regDate: state.toast.regDate,
});

Toast.propTypes = {
    message: PropTypes.string,
    time: PropTypes.number,
};
Toast.defaultProps = {
    content: 'message',
    time: 2500,
};

export default connect(mapStateToProps, null)(Toast);
