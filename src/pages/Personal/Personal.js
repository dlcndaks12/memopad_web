import React, {Component} from 'react';

class Personal extends Component {
    render() {
        const nickname = this.props.match.params.nickname;

        return (
            <div className="container">
                <h4 className="center-align">{nickname} 페이지입니다. <br/><br/> 준비중입니다...</h4>
            </div>
        );
    }
}

export default Personal;