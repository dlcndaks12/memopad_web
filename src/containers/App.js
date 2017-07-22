import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { auth } from '../actions/authentication';

import '../resources/styles/style.scss';

import { Header } from '../components';
import { Toast } from '../components';
import { Root, Home, Login, Register } from '../containers';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: true,
    };
  }

  componentDidMount() {
    return this.props.auth().then(
      () => {
        if(this.props.auth.id === undefined) {
        }
      }
    );
  }


  render() {
    let re = /(login|register)/;
    let isAuth = re.test(window.location.pathname);

    return (
      <div>
        {/* 공통영역 S */}
        <Toast/>
        {/* 공통영역 E */}

        {isAuth ? undefined : <Header/>}
        <div>
          <Route path="/" component={Root}/>
          <Route exact path="/" component={Home}/>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.authentication.auth,
});

const mapDispatchToProps = (dispatch) => ({
  auth: () => dispatch(auth()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
