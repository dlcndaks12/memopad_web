import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toast } from 'modules/toast';
import { setScrollEnd } from 'modules/layout';
import { getScrapList, addScrapList, clearScrapList } from 'modules/scrap';
import { CardList, CircleLoader } from 'components';

class Scrap extends Component {
    constructor(props) {
        super(props);

        // const params = qs.parse(props.location.search);
        // let city = params.city ? params.city : 'all';
        // let category = params.category ? params.category : 'all';
        // if (city !== 'all' && city !== 'none') city = city.split(',');
        // if (category !== 'all' && category !== 'none') category = category.split(',');

        this.state = {
            // nationCode: this.props.match.params.nation ? this.props.match.params.nation : 'kr',
            // city: city,
            // category: category,
            limit: 20,
            page: 1,
        };

        this.getScrapCondition = this.getScrapCondition.bind(this);
        this.getScrapList = this.getScrapList.bind(this);
        this.addScrapList = this.addScrapList.bind(this);
        this.handlePagePending = this.handlePagePending.bind(this);
        this.handleNation = this.handleNation.bind(this);
        this.handleCheckbox = this.handleCheckbox.bind(this);
    }

    componentDidMount() {
        this.props.clearScrapList();
        // this.getScrapList();
    }

    componentWillReceiveProps(nextProps) {
        // const scrollEnd = nextProps.layout.scroll.end;
        // const currentPage = this.state.page;
        // const nextPage = parseInt(currentPage, 10) + 1;
        // const totalPage = Math.ceil(nextProps.scrap.total / this.state.limit);
        // const pagePending = this.props.pending['scrap/ADD_SCRAP_LIST'];
        //
        // if (this.props.match.params.nation !== nextProps.match.params.nation || this.props.location.search !== nextProps.location.search) {
        //     const params = qs.parse(nextProps.location.search);
        //     let city = params.city ? params.city : 'all';
        //     let category = params.category ? params.category : 'all';
        //     if (city !== 'all' && city !== 'none') city = city.split(',');
        //     if (category !== 'all' && category !== 'none') category = category.split(',');
        //
        //     this.setState({
        //         nationCode: nextProps.match.params.nation ? nextProps.match.params.nation : 'kr',
        //         city: city,
        //         category: category,
        //         page: 1,
        //     }, () => {
        //         this.getScrapList();
        //     });
        // }
        //
        // if (this.props.layout.scroll.end !== scrollEnd) {
        //     if (!pagePending && scrollEnd && currentPage < totalPage) {
        //         this.setState({
        //             page: nextPage,
        //         }, () => {
        //             this.addScrapList().then(() => {
        //                 this.props.setScrollEnd(false);
        //             });
        //         });
        //     }
        // }
    }

    getScrapCondition() {
        const nationCode = JSON.parse(JSON.stringify(this.state.nationCode));
        const limit = JSON.parse(JSON.stringify(this.state.limit));
        const page = JSON.parse(JSON.stringify(this.state.page));
        const city = JSON.parse(JSON.stringify(this.state.city));
        const category = JSON.parse(JSON.stringify(this.state.category));

        return {
            nationCode: nationCode,
            city: city,
            category: category,
            limit: limit,
            page: page,
        };
    }

    getScrapList() {
        return this.props.getScrapList(this.getScrapCondition());
    }

    addScrapList() {
        return this.props.addScrapList(this.getScrapCondition());
    }

    handlePagePending(flag) {
        this.setState({
            pagePending: flag,
        });
    }

    handleNation(nationCode) {
        if (this.props.match.params.nation !== nationCode) {
            this.props.clearScrapList();
            this.props.history.push(`/scrap/${nationCode}`);
        }
    }

    handleCheckbox(selectedItems, type) {
        const city = type === 'city' ? selectedItems : this.state.city;
        const category = type === 'category' ? selectedItems : this.state.category;
        this.props.history.push(`${this.props.match.url}?city=${city}&category=${category}`);
    }

    render() {
        return (
            <Fragment>
                <div className="contents review">
                    <div className="card-list-wrap">
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <div/><hr/><div/><br/><hr/><div/><hr/><br/>
                        <CardList cards={this.props.scrap.scraps}/>
                        <div className="progress-area">
                            {this.props.pending['scrap/GET_SCRAP_LIST'] || this.props.pending['scrap/ADD_SCRAP_LIST'] ?
                                <CircleLoader color="blue"/>
                                : null}
                        </div>
                    </div>
                </div>
                <div className="btn-write">
                    <Link to="/review/write">
                        <i className="fas fa-pen"/>
                    </Link>
                </div>
            </Fragment>
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
    getScrapList: (scrapsCondition) => dispatch(getScrapList(scrapsCondition)),
    addScrapList: (scrapsCondition) => dispatch(addScrapList(scrapsCondition)),
    clearScrapList: () => dispatch(clearScrapList()),
    setScrollEnd: (isEnd) => dispatch(setScrollEnd(isEnd)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Scrap);