import React, {Component} from 'react';
import { Authentication } from '../components';
import { connect } from 'react-redux';
import { loginRequest } from '../actions/authentication';
import { toastOpen } from '../actions/toast';

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(id, pw) {
    return this.props.loginRequest(id, pw).then(
      () => {
        if(this.props.login.status === 'SUCCESS') {
          document.cookie = '_key=' + this.props.login.key;

          this.props.toastOpen('Welcome, ' + id, 3000);
          this.props.history.push('/');
          return true;
        } else {
          this.props.toastOpen('Incorrect username or password', 3000);
          return false;
        }
      }
    )
  }

  render() {
    return (
      <div>
        <Authentication
          mode={true}
          onLogin={this.handleLogin}
          status={this.props.status}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  login: state.authentication.login
});

const mapDispatchToProps = (dispatch) => ({
  loginRequest: (id, pw) => dispatch(loginRequest(id, pw)),
  toastOpen: (content, time) => dispatch(toastOpen(content, time)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

