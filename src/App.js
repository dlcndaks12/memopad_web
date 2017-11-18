import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'resources/styles/style.scss';
import { Route, Switch } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import { Header, Toast, Confirm, Footer, PrivateRoute } from 'components';
import { Home, Scrap, Login, Register, Write, NoMatch } from 'pages';
import { getCookie } from 'util/cookie';
import { authRequest } from 'actions/component/authentication';
import { locationInit } from 'actions/component/location';
import { categoryInit } from "actions/component/category";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
          simpleHeader: false,
        };

        // Auth 체크
        if (getCookie('Authentication')) {
            this.props.authRequest();
        }
        // Location 정보 획득
        this.props.locationInit();
        // Category 정보 획득
        this.props.categoryInit();

        this.handleScrollFrame = this.handleScrollFrame.bind(this);
    }

    // Scroll Handler
    handleScrollFrame(values) {
        const scrollTop = values.scrollTop;

        if (scrollTop > 50) {
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
                    className="scroll-wrap"
                    style={{ height: '100vh' }}
                    autoHide
                    onScrollFrame={this.handleScrollFrame} >
                    {/* 공통영역 S */}
                    <Toast />
                    <Confirm />
                    {/* 공통영역 E */}

                    {isAuth ? '' :
                        <Header />
                    }

                    <div id="container">
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <Route path="/login" component={Login}/>
                            <Route path="/register" component={Register}/>
                            <PrivateRoute path="/scrap/write" component={Write}/>
                            <Route path="/scrap/:nation" component={Scrap}/>
                            <Route path="/scrap" component={Scrap}/>
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
    status: state.authentication.status,
    sideNav: state.sideNav,
});

const mapDispatchToProps = (dispatch) => ({
    authRequest: () => dispatch(authRequest()),
    locationInit: () => dispatch(locationInit()),
    categoryInit: () => dispatch(categoryInit()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
