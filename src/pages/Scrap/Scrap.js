import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toast } from 'actions/component/toast';
import { scrapSetListCondition, requestScrapList } from 'actions/page/scrap';
import { NationTab, CardList, Option } from 'components';
import qs from 'query-string';
// const $ = window.$;

class Scrap extends Component {
    constructor(props) {
        super(props);

        const params = qs.parse(props.location.search);
        const nation = this.props.match.params.nation ? this.props.match.params.nation : 'kr';
        let city = params.city ? params.city : 'all';
        let category = params.category ? params.category : 'all';
        if (city !== 'all' && city !== 'none') city = city.split(',');
        if (category !== 'all' && category !== 'none') category = category.split(',');
        const scrapListCondition = {
            nationCode: nation,
            city: city,
            category: category,
            limit: 10,
            page: 1,
        };

        props.scrapSetListCondition(scrapListCondition);
        props.requestScrapList();

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
        }, () => {
            this.props.requestScrapList();
        });
    }

    handleChange(selectedItems, type) {
        this.props.scrapSetListCondition({
            [type]: selectedItems,
        });
        const city = type === 'city' ? selectedItems : this.props.scrapListCondition.city;
        const category = type === 'category' ? selectedItems : this.props.scrapListCondition.category;
        this.props.history.push(`${this.props.match.url}?city=${city}&category=${category}`);
        this.props.requestScrapList();
        /*this.setState({
            [`${type}Selected`]: selectedItems,
        }, () => {
            this.props.history.push(`${this.props.match.url}?city=${this.state.citySelected}&category=${this.state.categorySelected}`);
            this.props.requestScrapList();
        });*/
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
                    onChange={this.handleNation} />
                <Option
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
    scrapListCondition: state.scrap.scrapListCondition,
});

const mapDispatchToProps = (dispatch) => ({
    toast: (content, time) => dispatch(toast(content, time)),
    scrapSetListCondition: (nationCode, city, category, limit, page) => dispatch(scrapSetListCondition(nationCode, city, category, limit, page)),
    requestScrapList: () => dispatch(requestScrapList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Scrap);