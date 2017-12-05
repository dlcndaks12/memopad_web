import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toast } from 'modules/toast';
import { setScrapsCondition, getScraps } from 'modules/scrap';
import { NationTab, CardList, Option } from 'components';
import qs from 'query-string';

class Scrap extends Component {
    constructor(props) {
        super(props);
        // props.requestScrapList();

        this.setScrapCondition = this.setScrapCondition.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleNation = this.handleNation.bind(this);
        this.handleCheckbox = this.handleCheckbox.bind(this);
    }

    componentWillMount() {
        this.setScrapCondition();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.nation !== this.props.match.params.nation || prevProps.location.search !== this.props.location.search) {
            this.setScrapCondition();
        }
    }

    setScrapCondition() {
        const params = qs.parse(this.props.location.search);
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

        this.props.setScrapsCondition(scrapListCondition);
        this.props.getScraps();
    }

    handleLogin() {
        this.props.toast('로그인 해주세요.');
        this.props.history.push('/login');
    }

    handleNation(nationCode) {
        this.props.history.push(`/scrap/${nationCode}`);
    }

    handleCheckbox(selectedItems, type) {
        this.props.setScrapsCondition({
            [type]: selectedItems,
        });
        const city = type === 'city' ? selectedItems : this.props.scrap.city;
        const category = type === 'category' ? selectedItems : this.props.scrap.category;
        this.props.history.push(`${this.props.match.url}?city=${city}&category=${category}`);
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
                    selectedNationCode={this.props.scrap.nationCode}
                    onChange={this.handleNation} />
                <Option
                    selectedNation={this.props.scrap.nationCode}
                    selectedCity={this.props.scrap.city}
                    selectedCategory={this.props.scrap.category}
                    onChange={this.handleCheckbox} />
                <div className="card-wrap">
                    <CardList cards={this.props.scrap.scraps}/>
                </div>
                { this.props.auth.isLoggedIn ? writeButton : loginButton }
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    nation: state.location.nation,
    scrap: state.scrap,
});

const mapDispatchToProps = (dispatch) => ({
    toast: (content, time) => dispatch(toast(content, time)),
    setScrapsCondition: (nationCode, city, category, limit, page) => dispatch(setScrapsCondition(nationCode, city, category, limit, page)),
    getScraps: () => dispatch(getScraps()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Scrap);