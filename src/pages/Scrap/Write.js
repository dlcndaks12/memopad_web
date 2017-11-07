import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'actions/component/toast';
import { Write as ScrapWrite } from 'components';

class Write extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nationSelected: 'kr',
            citySelected: '6', // 서울
        };
    }

    render() {
        const nationSelected = this.state.nationSelected;
        const citySelected = this.state.citySelected;

        return (
            <div className="scrap-write">
                <blockquote>공유하고자 하는 link만 입력하시면 간편 스크랩 내용이 채워집니다.</blockquote>
                <ScrapWrite
                    nationSelected = {nationSelected}
                    citySelected = {citySelected} />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    login: state.authentication.login,
    location: state.location,
});

const mapDispatchToProps = (dispatch) => ({
    toast: (content, time) => dispatch(toast(content, time)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Write);