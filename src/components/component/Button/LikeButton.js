import React, { Component } from 'react';

class LikeButton extends Component {

    render() {
        const active = this.props.active;
        const count = this.props.count;

        return (
            <a className={`btn-heart ${active ? 'active' : ''}`} onClick={this.props.onClick}>
                <i className="fas fa-heart"/>
                {count > 0 ? <span className="like-count">{count}</span> : undefined}
            </a>
        );
    }
}

LikeButton.defaultProps = {
    active: false,
    count: 0,
};

export default LikeButton;
