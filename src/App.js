import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'resources/styles/style.scss';
import { Route, Switch } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import { Header, Toast, Confirm, Modal, Footer } from 'components';
import { Home, Scrap, Login, Register, Personal, NoMatch } from 'pages';
import { getCookie, deleteCookie } from 'util/cookie';
import { auth, authFailure } from 'modules/auth';
import { initLocations } from 'modules/location';
import { category } from 'modules/category';
import { setScrollEnd } from 'modules/layout';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            scrollTop: 0,
            simpleHeader: false,
        };

        this.detectScrollEnd = this.detectScrollEnd.bind(this);
        this.handleScrollFrame = this.handleScrollFrame.bind(this);
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


    componentWillReceiveProps(nextProps) {
        if (this.props.layout.scroll.top !== nextProps.layout.scroll.top) {
            const top = nextProps.layout.scroll.top;
            const scrollbars = this.refs.scrollbars;
            scrollbars.scrollTop(top);
        }
    }

    detectScrollEnd(top) {
        if (top > 0.8 && !this.props.layout.scroll.end) {
            this.props.setScrollEnd(true);
        } else if (top !== 1 && this.props.layout.scroll.end) {
            this.props.setScrollEnd(false);
        }
    }

    handleScrollFrame(values) {
        const top = values.top;
        const scrollTop = values.scrollTop;

        this.detectScrollEnd(top);

        if (scrollTop > 100) {
            if (!this.state.simpleHeader) {
                this.setState({
                    simpleHeader: true,
                });
            }
        } else {
            if (this.state.simpleHeader) {
                this.setState({
                    simpleHeader: false,
                });
            }
        }

        /* 위로 스크롤 */
        // if (scrollTop < this.scrollTop) {
        //     // clearTimeout(this.scrollTime);
        //     setTimeout(() => {
        //         if (this.state.simpleHeader) {
        //             this.setState({ simpleHeader: false });
        //         }
        //     }, 500);
        // } else { /* 아래로 스크롤 */
        //     // clearTimeout(this.scrollTime);
        //     if (scrollTop > 50) {
        //         setTimeout(() => {
        //             if (!this.state.simpleHeader) {
        //                 this.setState({ simpleHeader: true });
        //             }
        //         }, 500);
        //     } else {
        //         if (this.state.simpleHeader) {
        //             this.setState({ simpleHeader: false, });
        //         }
        //     }
        // }

        // this.scrollTop = scrollTop;
    }

    render() {
        let re = /(login|register)/;
        let isAuth = re.test(window.location.pathname);
        let appClassName = [];
        if (this.state.simpleHeader) appClassName.push('simple-header');
        if (this.props.sideNav.isOpen) appClassName.push('side-nav-open');
        appClassName = appClassName.toString().replace(',', ' ');
        return (
            <div id="app" className={appClassName}>
                <Scrollbars
                    ref="scrollbars"
                    className="scroll-wrap"
                    style={{ height: '100vh' }}
                    autoHide
                    onScrollFrame={this.handleScrollFrame}>
                    {/* 공통영역 S */}
                    <Toast />
                    <Confirm />
                    <Modal />
                    {/* 공통영역 E */}

                    {isAuth ? '' :
                        <Header />
                    }

                    <div id="container">
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <Route path="/login" component={Login}/>
                            <Route path="/register" component={Register}/>
                            <Route path="/scrap" component={Scrap}/>
                            <Route path="/:nickname" component={Personal}/>
                            <Route path="/*" component={NoMatch}/>
                        </Switch>
                    </div>

                    {isAuth ? '' :
                        <Footer/>
                    }
                </Scrollbars>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
