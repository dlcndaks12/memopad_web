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
import { SideNavigation } from "components";
import { sideNavClose } from "./modules/sideNav";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentScrollTop: 0,
            scrollTop: 0,
            simpleHeader: false,
        };

        this.detectScrollEnd = this.detectScrollEnd.bind(this);
        this.handleScrollFrame = this.handleScrollFrame.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        // if (JSON.stringify(this.props.sideNav.isOpen) !== JSON.stringify(nextProps.sideNav.isOpen)) {
        //     if (nextProps.sideNav.isOpen) {
        //         const scrollTop = window.scrollY;
        //         this.setState({currentScrollTop: scrollTop});
        //         window.document.body.style.position = 'fixed';
        //         window.document.body.style.top = -scrollTop + 'px';
        //         window.document.body.classList.add('side-nav-open');
        //     } else {
        //         window.document.body.style.position = '';
        //         window.document.body.style.top = '';
        //         window.scrollTo(0, this.state.currentScrollTop);
        //         window.document.body.classList.remove('side-nav-open');
        //     }
        // }
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

        window.addEventListener('scroll', _.throttle(this.handleScrollFrame, 500, {'trailing': true}), false);
    }

    detectScrollEnd(top) {
        if (top > 0.9 && !this.props.layout.scroll.end) {
            this.props.setScrollEnd(true);
        } else if (top <= 0.9 && this.props.layout.scroll.end) {
            this.props.setScrollEnd(false);
        }
    }

    handleScrollFrame() {
        const frameHeight = window.innerHeight;
        const scrollTop = window.scrollY;
        const scrollHeight = document.body.scrollHeight;
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

    render() {
        const re = /(login|register)/;
        const isAuth = re.test(window.location.pathname);

        return (
            <div id="app">

                {/* 공통영역 S */}
                <Toast />
                <Confirm />
                <Modal />
                <SideNavigation/>
                {/* 공통영역 E */}

                {isAuth ? '' : <Header />}

                <div id="container">
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/register" component={Register}/>
                        <Route path="/scrap" component={Scrap}/>
                        <Route path="/review" component={Review}/>
                        <Route path="/:nickname" component={Personal}/>
                        <Route path="/*" component={NoMatch}/>
                    </Switch>
                </div>

                {isAuth ? '' : <Footer/>}
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
