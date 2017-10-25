import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toast } from 'actions/toast';
import { NationTab, CardList, Option } from 'components';

// const $ = window.$;

class Scrap extends Component {
    constructor(props) {
        super(props);

        const nation = this.props.match.params.nation ? this.props.match.params.nation : 'kr';

        this.state = {
            defaultNationCode: nation,
            selectedNationCode: nation,
            citySelected: 'all',
            categorySelected: 'all',
        };

        this.handleLogin = this.handleLogin.bind(this);
        this.handleNation = this.handleNation.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleLogin() {
        this.props.toast('로그인 해주세요.');
        this.props.history.push('/login');
    }

    handleNation(nationCode) {
        this.props.history.push(`/scrap/${nationCode}`);
        this.setState({
            selectedNationCode: nationCode,
        });
    }

    handleChange(selectedItems, type) {
        this.setState({
            [`${type}Selected`]: selectedItems,
        }, () => {
            this.props.history.push(`${this.props.match.url}?city=${this.state.citySelected}&category=${this.state.categorySelected}`);
        });
    }

    render() {
        const loginButton = (
            <div className="btn-write">
                <button onClick={this.handleLogin}>
                    <i className="material-icons">mode_edit</i>
                </button>
            </div>
        );

        const writeButton = (
            <div className="btn-write">
                <Link to="/scrap/write">
                    <i className="material-icons">mode_edit</i>
                </Link>
            </div>
        );

        return (
            <div className="contents scrap">
                <NationTab
                    defaultValue={this.state.defaultNationCode}
                    onChange={this.handleNation} />
                <Option
                    nation={this.state.selectedNationCode}
                    onChange={this.handleChange} />
                <div className="card-wrap">
                    <CardList/>
                </div>
                { this.props.status.isLoggedIn ? writeButton : loginButton }
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    status: state.authentication.status,
    nation: state.location.nation,
});

const mapDispatchToProps = (dispatch) => ({
    toast: (content, time) => dispatch(toast(content, time)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Scrap);