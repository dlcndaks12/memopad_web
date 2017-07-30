import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../resources/styles/style.scss';
import { Route } from 'react-router-dom';
import { Header, Toast, PrivateRoute } from '../components';
import { Home, Login, Register } from '../containers';
import { authRequest } from '../actions/authentication';

class App extends Component {

  render() {
    /*let re = /(login|register)/;
    let isAuth = re.test(window.location.pathname);*/
    let isLoggined = sessionStorage.getItem('_key') !== null;

    return (
      <div>
        {/* 공통영역 S */}
        <Toast/>
        {/* 공통영역 E */}

       {/* {isAuth ? '' : <Header/>}*/}
        <div>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
          <PrivateRoute exact path="/" component={Home} isLoggined={isLoggined} />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  auth: dispatch(authRequest()),
});

export default connect(null, mapDispatchToProps)(App);
