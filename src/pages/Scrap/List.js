import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toast } from 'modules/toast';
import { addScraps, setScrapsCondition, getScraps } from 'modules/scrap';
import { scrollTo } from 'modules/layout';
import { NationTab, CardList, Option, CircleLoader } from 'components';
import qs from 'query-string';

class Scrap extends Component {
    constructor(props) {
        super(props);

        this.state = {
            limit: 20,
            pagePending: false,
        };

        this.setScrapCondition = this.setScrapCondition.bind(this);
        this.handlePagePending = this.handlePagePending.bind(this);
        this.handleNation = this.handleNation.bind(this);
        this.handleCheckbox = this.handleCheckbox.bind(this);
    }

    componentWillMount() {
        this.setScrapCondition(this.props, 'init');
    }

    componentWillReceiveProps(nextProps) {
        const scrollEnd = nextProps.layout.scroll.end;
        const currentPage = nextProps.scrap.page;
        const nextPage = +currentPage + 1;
        const totalPage = Math.ceil(nextProps.scrap.total / this.state.limit);
        const pagePending = this.state.pagePending;

        if (!pagePending && scrollEnd && currentPage < totalPage) {
            const city = nextProps.scrap.city;
            const category = nextProps.scrap.category;
            this.setState({
                pagePending: true
            }, () => {
                this.props.history.push(`${nextProps.match.url}?city=${city}&category=${category}&page=${nextPage}`);
            });
            return;
        }

        if (this.props.match.params.nation !== nextProps.match.params.nation || this.props.location.search !== nextProps.location.search) {
            this.setScrapCondition(nextProps);
        }
    }

    setScrapCondition(props, type) {
        const params = qs.parse(props.location.search);
        const nation = props.match.params.nation ? props.match.params.nation : 'kr';
        let city = params.city ? params.city : 'all';
        let category = params.category ? params.category : 'all';
        let prevPage = this.props.scrap.page;
        let page = params.page ? +params.page : 1;
        if (city !== 'all' && city !== 'none') city = city.split(',');
        if (category !== 'all' && category !== 'none') category = category.split(',');
        const scrapCondition = {
            nationCode: nation,
            city: city,
            category: category,
            limit: this.state.limit,
            page: page,
        };

        console.log(prevPage, page);

        if (type === 'init') {
            this.props.setScrapsCondition(scrapCondition);
            scrapCondition.page = 1;
            scrapCondition.limit = (page * scrapCondition.limit);
            props.getScraps(scrapCondition, false).then(() => {
                this.handlePagePending(false);
                const target = document.querySelectorAll(`.card-list .card-wrap:nth-child(${scrapCondition.limit - this.state.limit})`);
                if (target[0]) {
                    this.props.scrollTo(target[0].offsetTop);
                }
            });
            return;
        }
        if (prevPage >= page) {
            props.getScraps(scrapCondition).then(() => {
                this.handlePagePending(false);
            });
        } else {
            props.addScraps(scrapCondition).then(() => {
                this.handlePagePending(false);
            });
        }
    }

    handlePagePending(flag) {
        this.setState({
            pagePending: flag,
        });
    }

    handleNation(nationCode) {
        this.props.history.push(`/scrap/${nationCode}`);
    }

    handleCheckbox(selectedItems, type) {
        const city = type === 'city' ? selectedItems : this.props.scrap.city;
        const category = type === 'category' ? selectedItems : this.props.scrap.category;
        this.props.history.push(`${this.props.match.url}?city=${city}&category=${category}`);
    }

    render() {
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
                <div className="card-list-wrap">
                    <CardList cards={this.props.scrap.scraps}/>
                    <div className="progress-area">
                        {this.props.pending['scrap/GET_SCRAPS'] || this.props.pending['scrap/ADD_SCRAPS'] ?
                            <CircleLoader color="blue"/>
                            : null}

                    </div>
                </div>
                <div className="btn-write">
                    <Link to="/scrap/write">
                        <i className="material-icons">mode_edit</i>
                    </Link>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    nation: state.location.nation,
    scrap: state.scrap,
    layout: state.layout,
    pending: state.pender.pending,
});

const mapDispatchToProps = (dispatch) => ({
    toast: (content, time) => dispatch(toast(content, time)),
    scrollTo: (top) => dispatch(scrollTo(top)),
    setScrapsCondition: (nationCode, city, category, limit, page) => dispatch(setScrapsCondition(nationCode, city, category, limit, page)),
    getScraps: (scrapsCondition, settable) => dispatch(getScraps(scrapsCondition, settable)),
    addScraps: (scrapsCondition, settable) => dispatch(addScraps(scrapsCondition, settable)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Scrap);