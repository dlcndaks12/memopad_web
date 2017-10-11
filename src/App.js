import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'resources/styles/style.scss';
import { Route, Switch } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import { Header, Toast, Footer, PrivateRoute } from 'components';
import { Scrap, Login, Register, Write, NoMatch } from 'pages';
import { authRequest } from 'actions/authentication';
import { locationInit } from 'actions/location';

class App extends Component {
    constructor(props) {
        super(props);

        // Auth 체크
        this.props.authRequest();
        // Location 정보 획득
        this.props.locationInit();
    }

    render() {
        let re = /(login|register)/;
        let isAuth = re.test(window.location.pathname);
        let pathname = this.props.location.pathname;
        if(pathname === '/') pathname = '/home';

        return (
            <div id="app">
                <Scrollbars
                  className="scroll-wrap"
                  style={{ height: '100vh' }}
                  autoHide >
                {/* 공통영역 S */}
                    <Toast />
                    {/* 공통영역 E */}

                    {isAuth ? '' :
                        <Header />
                    }

                    <div id="container" className={`${pathname.substring(1, pathname.length)}`}>
                    {/*<div id="container">*/}
                        {/*<PrivateRoute exact path="/" component={Home} isLoggedIn={isLoggedIn}/>*/}
                        <Switch>
                            <Route exact path="/" component={Scrap}/>
                            <Route path="/login" component={Login}/>
                            <Route path="/register" component={Register}/>
                            <Route path="/scrap" component={Scrap}/>
                            <PrivateRoute path="/scrap/write" component={Write}/>
                            <Route path="*" component={NoMatch}/>
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
});

const mapDispatchToProps = (dispatch) => ({
    authRequest: () => dispatch(authRequest()),
    locationInit: () => dispatch(locationInit()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
