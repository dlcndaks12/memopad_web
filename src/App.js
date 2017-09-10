import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'resources/styles/style.scss';
import { Route, withRouter, Switch } from 'react-router-dom';
import { Header, Toast, PrivateRoute } from 'components';
import { Home, Login, Register, NoMatch } from 'pages';
import { authRequest } from 'actions/authentication';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            key: localStorage.getItem('_key')
        };

        if(this.state.key !== null) {
            console.log('자동 로그인 절차');
        }
    }

    render() {
        let re = /(login|register)/;
        let isAuth = re.test(window.location.pathname);
        let isLoggedIn = sessionStorage.getItem('_key') !== null;

        return (
            <div>
                {/* 공통영역 S */}
                <Toast/>
                {/* 공통영역 E */}

                {isAuth ? '' :
                    <Header isLoggedIn={isLoggedIn}/>
                }

                <div>
                    {/*<PrivateRoute exact path="/" component={Home} isLoggedIn={isLoggedIn}/>*/}
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/register" component={Register}/>
                        <Route path="*" component={NoMatch}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    auth: () => dispatch(authRequest()),
});

export default withRouter(connect(null, mapDispatchToProps)(App));
