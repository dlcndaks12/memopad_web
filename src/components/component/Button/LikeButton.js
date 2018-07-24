import React, { Component } from 'react';

class LikeButton extends Component {
    shouldComponentUpdate(nextProps) {
        return JSON.stringify(this.props) !== JSON.stringify(nextProps);
    }

    render() {
        const active = this.props.active;
        const count = this.props.count;

        return (
            <a className={`btn-heart ${active ? 'active' : ''}`} onClick={this.props.onClick}>
                <span className="heart-wrap">
                    <i className="fas fa-heart"/>
                    <i className="fas fa-heart effector"/>
                </span>
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
