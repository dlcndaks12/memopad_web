import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'resources/styles/style.scss';
import { Route, Switch } from 'react-router-dom';
import _ from 'lodash';
import { Header, Toast, Confirm, Modal, Footer } from 'components';
import { Home, Scrap, Login, Register, Review, Personal, NoMatch } from 'pages';
import { getCookie, deleteCookie } from 'util/cookie';
import { auth, authFailure } from 'modules/auth';
import { initLocations } from 'modules/location';
import { category } from 'modules/category';
import { setScrollEnd } from 'modules/layout';
import {sideNavClose} from "./modules/sideNav";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            scrollTop: 0,
            simpleHeader: false,
        };

        this.detectScrollEnd = this.detectScrollEnd.bind(this);
        this.handleScrollFrame = this.handleScrollFrame.bind(this);
        this.handleClickBody = this.handleClickBody.bind(this);
    }

    componentDidMount() {
        // Auth 체크
        if (getCookie('Authentication')) {
            this.props.auth().catch(() => {
                deleteCookie('Authentication');
            });
        } else {
            this.props.authFailure();
            deleteCookie('Authentication');
        }
        // Location 정보 획득
        this.props.initLocations();
        // Category 정보 획득
        this.props.category();
    }

    detectScrollEnd(top) {
        if (top > 0.9 && !this.props.layout.scroll.end) {
            this.props.setScrollEnd(true);
        } else if (top <= 0.9 && this.props.layout.scroll.end) {
            this.props.setScrollEnd(false);
        }
    }

    handleScrollFrame() {
        const frame = this.refs.container;
        const frameHeight = frame.clientHeight;
        const scrollTop = frame.scrollTop;
        const scrollHeight = frame.scrollHeight;
        const top = (scrollTop + frameHeight) / scrollHeight;

        this.detectScrollEnd(top);

        // const scrollTop = values.scrollTop;
        //
        // if (scrollTop > 100) {
        //     if (!this.state.simpleHeader) {
        //         this.setState({
        //             simpleHeader: true,
        //         });
        //     }
        // } else {
        //     if (this.state.simpleHeader) {
        //         this.setState({
        //             simpleHeader: false,
        //         });
        //     }
        // }
    }

    handleClickBody() {
        if (this.props.sideNav.isOpen) {
            this.props.sideNavClose();
        }
    }

    render() {
        const re = /(login|register)/;
        const isAuth = re.test(window.location.pathname);
        let appClassName = [];
        if (this.state.simpleHeader) appClassName.push('simple-header');
        if (this.props.sideNav.isOpen) appClassName.push('side-nav-open');
        appClassName = appClassName.toString().replace(',', ' ');

        return (
            <div id="app"
                 className={appClassName}
                 onClick={this.handleClickBody}>

                {/* 공통영역 S */}
                <Toast />
                <Confirm />
                <Modal />
                {/* 공통영역 E */}

                {isAuth ? '' : <Header />}

                <div id="container"
                     ref="container"
                     onScroll={_.throttle(this.handleScrollFrame, 1000, {'trailing': true})}>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/register" component={Register}/>
                        <Route path="/scrap" component={Scrap}/>
                        <Route path="/review" component={Review}/>
                        <Route path="/:nickname" component={Personal}/>
                        <Route path="/*" component={NoMatch}/>
                    </Switch>

                    {isAuth ? '' : <Footer/>}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    status: state.auth.status,
    sideNav: state.sideNav,
    layout: state.layout,
});

const mapDispatchToProps = (dispatch) => ({
    auth: () => dispatch(auth()),
    authFailure: () => dispatch(authFailure()),
    initLocations: () => dispatch(initLocations()),
    category: () => dispatch(category()),
    setScrollEnd: (isEnd) => dispatch(setScrollEnd(isEnd)),
    sideNavClose: () => dispatch(sideNavClose()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
