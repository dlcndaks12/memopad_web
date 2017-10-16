import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toastOpen } from 'actions/toast';
import { NationTab, CardList, Option } from 'components';

// const $ = window.$;

class Scrap extends Component {
    constructor(props) {
        super(props);

        const nation = this.props.match.params.nation ? this.props.match.params.nation : 'kr';

        this.state = {
            defaultNationCode: nation,
            selectedNationCode: nation,
        };

        this.handleLogin = this.handleLogin.bind(this);
        this.handleNation = this.handleNation.bind(this);
        this.handleCity = this.handleCity.bind(this);
    }

    handleLogin() {
        this.props.toastOpen('로그인 해주세요.', 2500);
        this.props.history.push('/login');
    }

    handleNation(nationCode) {
        this.props.history.push(`/scrap/${nationCode}`);
        this.setState({
            selectedNationCode: nationCode,
        });
    }

    handleCity(selectedCities) {
        console.log('scrap , ', selectedCities);
        this.props.history.push(`${this.props.match.url}?city=${selectedCities}`);
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
                    onChangeCity={this.handleCity} />
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
    toastOpen: (content, time) => dispatch(toastOpen(content, time)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Scrap);