import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../resources/styles/style.scss';
import { Route, withRouter } from 'react-router-dom';
import { Header, Toast, PrivateRoute } from '../components';
import { Home, Login, Register } from '../containers';
import { authRequest } from '../actions/authentication';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            key: localStorage.getItem('_key')
        };

        console.log(this.state.key);
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
                    <PrivateRoute exact path="/" component={Home} isLoggedIn={isLoggedIn}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/register" component={Register}/>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    auth: () => dispatch(authRequest()),
});

export default withRouter(connect(null, mapDispatchToProps)(App));
