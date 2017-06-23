import React, { Component } from 'react';
import '../styles/style.scss';
import { Route } from 'react-router-dom';
import { Header } from '../components';
import { Toast } from '../common';
import { Home, Login, Register } from '../containers';

class App extends Component {
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
          <Route exact path="/" component={Home}/>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
        </div>
      </div>
    );
  }
}

export default App;
