import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'resources/styles/style.scss';
import { Route, Switch } from 'react-router-dom';
import { Header, Toast, Footer } from 'components';
import { Scrap, Login, Register, Write, NoMatch } from 'pages';
import { authRequest } from 'actions/authentication';

class App extends Component {
    constructor(props) {
        super(props);

        // Auth 체크
        this.props.authRequest();
    }

    render() {
        let re = /(login|register)/;
        let isAuth = re.test(window.location.pathname);
        let isLoggedIn = this.props.authentication.status.id !== '';
        let pathname = this.props.location.pathname;
        if(pathname === '/') pathname = '/home';

        return (
            <div>
                {/* 공통영역 S */}
                <Toast/>
                {/* 공통영역 E */}

                {isAuth ? '' :
                    <Header isLoggedIn={isLoggedIn}/>
                }

                <div id="container" className={`${pathname.substring(1, pathname.length)}`}>
                {/*<div id="container">*/}
                    {/*<PrivateRoute exact path="/" component={Home} isLoggedIn={isLoggedIn}/>*/}
                    <Switch>
                        <Route exact path="/" component={Scrap}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/register" component={Register}/>
                        <Route path="/scrap" component={Scrap}/>
                        <Route path="/write" component={Write}/>
                        <Route path="*" component={NoMatch}/>
                    </Switch>
                </div>

                {isAuth ? '' :
                    <Footer/>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    authentication: state.authentication,
});

const mapDispatchToProps = (dispatch) => ({
    authRequest: () => dispatch(authRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
